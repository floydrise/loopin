import {createFileRoute} from '@tanstack/react-router'
import {useQuery} from "@tanstack/react-query";
import {getEventsQueryOptions} from "@/lib/api.ts";

export const Route = createFileRoute('/')({
    component: App,
})

function App() {
    const {isPending, isError, data, error} = useQuery(getEventsQueryOptions);
    if (isPending) return <p>Loading ...</p>
    if (isError) return <p>{error.message}</p>;
    const events = data.events;
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            {events.map((event) => (
                <div className={"flex flex-col"}>
                    <p>Name: {event.eventName}</p>
                    <p>Description: {event.eventDescription}</p>
                    <p>Location: {event.eventLocation}</p>
                </div>
            ))}
        </div>
    )
}
