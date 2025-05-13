import { queryOptions } from "@tanstack/react-query";
import type { AppType } from "../../../server";
import { hc } from "hono/client";

const api = hc<AppType>("/").api;

const fetchAllEvents = async () => {
  const res = await api.events.$get();
  if (!res.ok) throw new Error("An error occurred while fetching the events");
  return await res.json();
};
export const getEventsQueryOptions = queryOptions({
  queryKey: ["fetch_events"],
  queryFn: fetchAllEvents,
  staleTime: 5 * 1000,
});
