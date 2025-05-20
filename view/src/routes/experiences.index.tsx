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

const pageSearchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
});

export const Route = createFileRoute("/experiences/")({
  validateSearch: zodValidator(pageSearchSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const { page } = Route.useSearch();
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(
    getEventsQueryOptions(page),
  );
  if (isError) {
    toast.error("An error occurred: " + error);
  }
  const events = data?.events;

  useEffect(() => {
    if (data && data.totalPages < page)
      navigate({
        to: "/experiences",
        search: () => ({ page: 1 }),
        replace: true,
      });
  }, [data, page, navigate]);

  return (
    <>
      <div
        className={
          "grid grid-cols-1 md:grid-cols-3 gap-y-8 mb-10 justify-items-center"
        }
      >
        {isLoading
          ? new Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className={"w-100 h-100"} />
              ))
          : events?.map((event) => (
              <ExperienceCard
                key={event.eventId}
                event={event as eventSelectType}
              />
            ))}
      </div>
    </>
  );
}
