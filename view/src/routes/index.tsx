import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/auth_client.ts";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data } = useSession();
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {data?.session ? data.user.name : "Nope"}
    </div>
  );
}
