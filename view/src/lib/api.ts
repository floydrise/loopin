import { queryOptions } from "@tanstack/react-query";
import type { AppType } from "../../../server";
import { hc } from "hono/client";
import type {
  eventInsertType,
  eventUpdateType,
} from "../../../server/types.ts";
import { toast } from "sonner";

const api = hc<AppType>("/").api;

const fetchAllEvents = async () => {
  const res = await api.experiences.$get();
  if (!res.ok) throw new Error("An error occurred while fetching the events");
  return await res.json();
};

const fetchEventById = async (id: string) => {
  const res = await api.experiences[":id{[0-9]+}"].$get({
    param: {
      id: id,
    },
  });
  if (res.status === 404) throw new Error("Not found");
  if (!res.ok) throw new Error("An error occurred while fetching the event");
  return await res.json();
};

export const deleteEvent = async (id: number) => {
  const res = await api.experiences[":id{[0-9]+}"].$delete({
    param: {
      id: String(id),
    },
  });
  if (!res.ok) throw new Error("An error occurred while deleting the event");
  return await res.json();
};

export const postEvent = async (event: eventInsertType) => {
  if (event.eventImg?.trim() === "") delete event.eventImg;
  const res = await api.experiences.$post({
    json: event,
  });
  if (!res.ok) {
    toast.error("An error occurred while creating the event");
    throw new Error("An error occurred while creating the event");
  }
  return await res.json();
};

export const patchEvent = async (id: number, event: eventUpdateType) => {
  if (event.eventImg?.trim() === "") delete event.eventImg;
  const res = await api.experiences[":id{[0-9]+}"].$patch({
    param: {
      id: String(id),
    },
    json: event,
  });
  if (!res.ok) {
    toast.error("An error occurred while creating the event");
    throw new Error("An error occurred while creating the event");
  }
  return await res.json();
};

export const getEventsQueryOptions = queryOptions({
  queryKey: ["fetch_events"],
  queryFn: fetchAllEvents,
  staleTime: 5 * 1000,
});

export const getEventByIdQueryOptions = (eventId: string) => {
  return queryOptions({
    queryKey: ["fetch_event_by_id", eventId],
    queryFn: () => fetchEventById(eventId),
  });
};

export const postSubscription = async (eventId: number, userId: string) => {
  const res = await api.subscriptions.$post({
    json: {
      eventId: eventId,
      userId: userId,
    },
  });
  if (!res.ok) {
    toast.error("An error occurred while adding subscription");
    throw new Error("An error occurred while creating the event");
  }
  return await res.json();
};
