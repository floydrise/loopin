import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/experiences/$experienceId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/experiences/$experienceId"!</div>;
}
