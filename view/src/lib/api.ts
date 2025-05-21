import { queryOptions } from "@tanstack/react-query";
import type { AppType } from "../../../server";
import { hc } from "hono/client";
import type {
  eventInsertType,
  eventUpdateType,
  SubscriptionTicketType,
} from "../../../server/types.ts";
import { toast } from "sonner";
import { getAccessToken } from "@/lib/auth_client.ts";
import { DateTime } from "luxon";

const api = hc<AppType>("/").api;

// API actions
const fetchAllEvents = async (page: number) => {
  const res = await api.experiences.$get({
    query: {
      page: String(page),
    },
  });
  if (!res.ok) throw new Error("error while fetching the events");
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
export const postSubscription = async (eventId: number, userId: string) => {
  const res = await api.subscriptions.$post({
    json: {
      eventId: eventId,
      userId: userId,
    },
  });
  if (!res.ok) {
    throw new Error("subscription already exists in your records");
  }
  return await res.json();
};
export const fetchSubscriptions = async () => {
  const res = await api.subscriptions.$get();
  if (!res.ok)
    throw new Error("An error occurred while fetching subscriptions");
  return await res.json();
};
export const deleteSubscription = async (id: number) => {
  const res = await api.subscriptions[":id{[0-9]+}"].$delete({
    param: {
      id: String(id),
    },
  });
  if (!res.ok)
    throw new Error("An error occurred while deleting the subscription");
  return await res.json();
};
export const postToGoogleCalendar = async (
  event: SubscriptionTicketType,
  accessToken: string | undefined,
) => {
  if (accessToken == undefined) throw new Error("No access token");
  const timezone = "Europe/Sofia";
  const start = DateTime.fromISO(
    `${event.eventDateStart}T${event.eventTimeStart}`,
    { zone: timezone },
  );
  const end = start.plus({ hour: 1 });
  const googleEvent = {
    summary: event.eventName,
    start: {
      dateTime: start.toISO(),
      timeZone: timezone,
    },
    end: {
      dateTime: end.toISO(),
      timeZone: timezone,
    },
    location: event.eventLocation,
    description:
      event.eventDescription ||
      `Price: ${event.eventPrice == 0 ? "Free" : event.eventPrice}`,
  };
  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify(googleEvent),
    },
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.error?.message || "Failed to add experience to Google Calendar",
    );
  }
  return await res.json();
};
export const sendEmail = async () => {
  const res = await api.send_email.$get();
  if (!res.ok) {
    throw new Error("Could not send email");
  }
  return await res.json();
};

// QueryOptions
export const getEventsQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ["fetch_events", page],
    queryFn: () => fetchAllEvents(page),
    staleTime: 5 * 1000 * 60,
  });
export const getEventByIdQueryOptions = (eventId: string) => {
  return queryOptions({
    queryKey: ["fetch_event_by_id", eventId],
    queryFn: () => fetchEventById(eventId),
  });
};
export const getSubscriptionsQueryOptions = queryOptions({
  queryKey: ["fetch_subscriptions"],
  queryFn: fetchSubscriptions,
  staleTime: 5 * 1000,
});
export const fetchAccessTokenQueryOptions = queryOptions({
  queryKey: ["fetch_access_toke"],
  queryFn: async () =>
    await getAccessToken({
      providerId: "google",
    }),
});
