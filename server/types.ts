import {eventSelectSchema} from "./db/schema";
import {z} from "zod";

export type eventSelectType = z.infer<typeof eventSelectSchema>;