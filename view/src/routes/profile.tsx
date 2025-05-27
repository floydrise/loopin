import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { deleteUser, useSession } from "@/lib/auth_client.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge.tsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSubscriptionsQueryOptions } from "@/lib/api.ts";
import { toast } from "sonner";
import SubscriptionTicket from "@/components/SubscriptionTicket.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { beforeLoadAuth } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Frown, Loader, Rocket } from "lucide-react";
import { Fragment } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/profile")({
  beforeLoad: async ({ location }) => {
    const data = await beforeLoadAuth();
    if (!data) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "User profile",
      },
      {
        title: "Profile • LoopIn",
      },
    ],
  }),
});

function RouteComponent() {
  const { data } = useSession();

  const user = data?.user;
  const {
    data: queryData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(getSubscriptionsQueryOptions);
  if (isError) {
    toast.error("An error occurred: " + error);
  }
  const navigate = useNavigate();

  return (
    <>
      <div className={"md:mx-30 mt-30"}>
        <h1 className={"text-2xl font-bold ml-4"}>My profile:</h1>
        <div className={"flex ml-8 items-center gap-1 my-6"}>
          <Avatar className={"size-14 border border-black"}>
            <AvatarImage src={user?.image ?? ""} alt="User avatar image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <span className={"inline-flex gap-1"}>
              <h1>{user?.name}</h1>
              <Badge>{user?.role}</Badge>{" "}
            </span>
            <p
              className={"text-gray-600 dark:text-gray-400 font-light text-sm"}
            >
              {user?.email}
            </p>
            <p
              className={
                "text-gray-600 font-semibold dark:text-gray-400 text-sm"
              }
            >
              Registered:{" "}
              {user?.createdAt
                .toISOString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-")}
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className={"text-red-500"}>
                  This action <span className={"underline italic"}>cannot</span>{" "}
                  be undone. This will permanently delete your account and
                  remove your data from our servers.
                </AlertDialogDescription>
                <br />
                <AlertDialogDescription className={"font-semibold"}>
                  You'll be sent an email with a confirmation link. Please,
                  click the link and your account will be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deleteUser({});
                    navigate({ to: "/goodbye" });
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <h1 className={"text-2xl font-bold ml-4"}>My orders:</h1>
        <section className={"grid grid-cols-1 md:grid-cols-2 gap-4 my-6"}>
          {isLoading
            ? new Array(4)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className={"max-w-md h-44 mx-2"} />
                ))
            : queryData?.pages.map((group, index) => (
                <Fragment key={index}>
                  {group.subscriptions.length === 0 ? (
                    <p className={"ml-6 text-muted-foreground font-light"}>
                      No orders yet, why don't you{" "}
                      <Link to={"/experiences"} className={"underline"}>
                        add
                      </Link>{" "}
                      one?
                    </p>
                  ) : (
                    group.subscriptions.map((event) => (
                      <SubscriptionTicket event={event} key={event.eventId} />
                    ))
                  )}
                </Fragment>
              ))}
        </section>
      </div>
      <div className={"flex justify-center"}>
        {hasNextPage && (
          <Button
            disabled={!hasNextPage || isFetching}
            onClick={() => fetchNextPage()}
            className={`duration-300 transition ease-in-out hover:-translate-y-1 hover:scale-105 mb-8`}
          >
            {isFetchingNextPage ? (
              <Loader className={"animate-spin"} />
            ) : hasNextPage ? (
              <span className={"flex items-center gap-2"}>
                <Rocket /> Load More
              </span>
            ) : (
              <span className={"flex items-center gap-2"}>
                <Frown /> Nothing more to load
              </span>
            )}
          </Button>
        )}
      </div>
    </>
  );
}
