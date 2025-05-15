import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/auth_client.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSession();
  const user = data?.user;
  return (
    <div className={"md:mx-30"}>
      <h1 className={"text-2xl font-bold ml-4"}>My profile:</h1>
      <div className={"flex ml-8 items-center gap-1"}>
        <Avatar className={"size-14 border border-black"}>
          <AvatarImage src={user?.image ?? ""} alt="User avatar image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1>{user?.name}</h1>
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
    </div>
  );
}
