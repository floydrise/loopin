import { eventSelectSchema, eventsPostSchema, eventUpdateSchema, stripeInsertSchema } from "./db/schema";
import { z } from "zod";

export type eventSelectType = z.infer<typeof eventSelectSchema>;
export type eventInsertType = z.infer<typeof eventsPostSchema>;
export type eventUpdateType = z.infer<typeof eventUpdateSchema>;
export type SubscriptionTicketType = Omit<eventSelectType, "createdAt">
export type StripeInsertType = z.infer<typeof stripeInsertSchema>