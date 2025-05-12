import {createFileRoute} from '@tanstack/react-router'
import {useQuery} from "@tanstack/react-query";
import {getEventsQueryOptions} from "@/lib/api.ts";
export const Route = createFileRoute('/experiences')({
    component: RouteComponent,
})

function RouteComponent() {
    const {isPending, isError, data, error} = useQuery(getEventsQueryOptions);
    if (isPending) return <p>Loading ...</p>
    if (isError) return <p>{error.message}</p>;
    const events = data.events;

    return <div>{events.map((event) => (
        <div className={"flex flex-col"}>
            <p>Name: {event.eventName}</p>
            <p>Description: {event.eventDescription}</p>
            <p>Location: {event.eventLocation}</p>
        </div>
    ))}</div>
}
