import { eventSelectSchema, eventsPostSchema } from "./db/schema";
import { z } from "zod";

export type eventSelectType = z.infer<typeof eventSelectSchema>;
export type eventInsertType = z.infer<typeof eventsPostSchema>;
