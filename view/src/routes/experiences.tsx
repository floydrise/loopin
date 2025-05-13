import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getEventsQueryOptions } from "@/lib/api.ts";
import ExperienceCard from "@/components/ExperienceCard.tsx";
import type { eventSelectType } from "../../../server/types.ts";

export const Route = createFileRoute("/experiences")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data, error } = useQuery(getEventsQueryOptions);
  if (isPending) return <p>Loading ...</p>;
  if (isError) return <p>{error.message}</p>;
  const events = data.events;

  return (
    <div className={"grid grid-cols-1 md:grid-cols-3 justify-items-center"}>
      {events.map((event) => (
        <ExperienceCard key={event.eventId} event={event as eventSelectType} />
      ))}
    </div>
  );
}
