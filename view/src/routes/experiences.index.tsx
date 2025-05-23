import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getEventsQueryOptions } from "@/lib/api.ts";
import ExperienceCard from "@/components/ExperienceCard.tsx";
import type { eventSelectType } from "../../../server/types.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { toast } from "sonner";
import { z } from "zod";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paginationRangeAlgorithm } from "@/lib/utils.ts";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { ArrowRight, Loader, Search } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "@tanstack/react-form";

const pageSearchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  search: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/experiences/")({
  validateSearch: zodValidator(pageSearchSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const { page, search } = Route.useSearch();
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(
    getEventsQueryOptions(page, search),
  );
  if (isError) {
    toast.error("An error occurred: " + error);
  }

  const form = useForm({
    defaultValues: {
      searchVal: "",
    },
    onSubmit: async ({ value }) => {
      navigate({
        to: "/experiences",
        search: () => ({ page: 1, search: value.searchVal }),
      });
    },
  });

  const events = data?.events;
  const numOfPages = data?.totalPages;
  const paginationRange = paginationRangeAlgorithm(page, numOfPages!);

  useEffect(() => {
    if (data && data.totalPages < page)
      navigate({
        to: "/experiences",
        search: (prev) => ({ ...prev, page: 1 }),
        replace: true,
      });
  }, [data, page, navigate]);

  return (
    <section className={"mt-30"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className={"max-w-xl w-4/5 mx-auto mb-10"}
      >
        <form.Field
          name={"searchVal"}
          children={(field) => (
            <>
              <Label htmlFor={field.name} className={"sr-only"}>
                Search
              </Label>
              <div className={"relative"}>
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Search />
                </div>
                <Input
                  id={field.name}
                  type={"search"}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={"w-full px-10 rounded-full"}
                  placeholder={"Search experiences"}
                />
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type={"submit"}
                      disabled={!canSubmit}
                      size={"icon"}
                      variant={"ghost"}
                      className={"rounded-full absolute top-0 right-0"}
                    >
                      {isSubmitting ? (
                        <Loader className={"animate-spin"} />
                      ) : (
                        <ArrowRight />
                      )}
                    </Button>
                  )}
                />
              </div>
            </>
          )}
        />
      </form>
      <div
        className={
          "grid grid-cols-1 md:grid-cols-3 gap-y-8 mb-10 justify-items-center "
        }
      >
        {isLoading ? (
          new Array(6)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className={"w-100 h-100"} />
            ))
        ) : events?.length! > 0 ? (
          events?.map((event) => (
            <ExperienceCard
              key={event.eventId}
              event={event as eventSelectType}
            />
          ))
        ) : (
          <p className={"text-4xl text-muted-foreground"}>No matches</p>
        )}
      </div>
      {numOfPages! > 1 && (
        <Pagination className={"m-auto mb-10"}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={page === 1}
                to={"/experiences"}
                search={(prev) => ({ ...prev, page: prev.page! - 1 })}
                className={`${page === 1 && "cursor-not-allowed"}`}
              />
            </PaginationItem>
            {paginationRange.map((val, index) => {
              if (val === "ellipsis") {
                return (
                  <PaginationItem key={index + val}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    to={"/experiences"}
                    search={(prev) => ({ ...prev, page: Number(val) })}
                    isActive={page === val}
                  >
                    {val}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                disabled={!data?.hasNext}
                to={"/experiences"}
                search={(prev) => ({ ...prev, page: prev.page! + 1 })}
                className={`${!data?.hasNext && "cursor-not-allowed"}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
}
