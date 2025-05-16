import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/auth_client.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge.tsx";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionsQueryOptions } from "@/lib/api.ts";
import { toast } from "sonner";
import SubscriptionTicket from "@/components/SubscriptionTicket.tsx";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSession();
  const user = data?.user;
  const {
    isLoading,
    isError,
    error,
    data: queryData,
  } = useQuery(getSubscriptionsQueryOptions);
  if (isError) {
    toast.error("An error occurred: " + error);
  }
  if (isLoading) return <p>Loading</p>;

  return (
    <div className={"md:mx-30"}>
      <h1 className={"text-2xl font-bold ml-4"}>My profile:</h1>
      <div className={"flex ml-8 items-center gap-1"}>
        <Avatar className={"size-14 border border-black"}>
          <AvatarImage src={user?.image ?? ""} alt="User avatar image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <span className={"inline-flex gap-1"}>
            <h1>{user?.name}</h1>
            <Badge variant={user?.role == "staff" ? "destructive" : "default"}>
              {user?.role}
            </Badge>{" "}
          </span>
          <p className={"text-gray-600 dark:text-gray-400 font-light text-sm"}>
            {user?.email}
          </p>
          <p
            className={"text-gray-600 font-semibold dark:text-gray-400 text-sm"}
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
      </div>
      <h1 className={"text-2xl mt-10 font-bold ml-4"}>My orders:</h1>
      <section className={"grid grid-cols-1 md:grid-cols-2 gap-4 my-6"}>
        {queryData?.map((event) => (
          <SubscriptionTicket event={event} key={event.eventId} />
        ))}
      </section>
    </div>
  );
}
