import {Hono} from "hono";
import {db} from "../db";
import {eventsPostSchema, eventsTable, eventUpdateSchema} from "../db/schema";
import {eq} from "drizzle-orm";
import {zValidator} from '@hono/zod-validator'

const app = new Hono()
    .get("/", async (c) => {
        const events = await db.select().from(eventsTable);
        return c.json({events});
    })
    .get("/:id{[0-9]+}", async (c) => {
        const {id} = c.req.param();
        const event = await db.select().from(eventsTable).where(eq(eventsTable.eventId, Number(id)));
        if (event.length == 0) {
            return c.notFound();
        }
        return c.json({event: event[0]});
    })
    .delete("/:id{[0-9]+}", async (c) => {
        const {id} = c.req.param();
        const deletedEvent = await db.delete(eventsTable).where(eq(eventsTable.eventId, Number(id))).returning().then(res => res[0]);
        if (!deletedEvent) {
            return c.notFound();
        }
        return c.json({msg: "Successfully deleted event!", deletedEvent: deletedEvent}, 200);
    })
    .post("/", zValidator("json", eventsPostSchema), async (c) => {
        const validated = c.req.valid("json");
        const newEvent = await db.insert(eventsTable).values(validated).returning().then(res => res[0]);
        return c.json({newEvent}, 201);
    })
    .patch("/:id{[0-9]+}", zValidator("json", eventUpdateSchema), async (c) => {
        const {id} = c.req.param();
        const validated = c.req.valid("json");
        const updatedEvent = await db.update(eventsTable).set(validated).where(eq(eventsTable.eventId, Number(id))).returning().then(res => res[0]);
        return c.json({msg: "Successfully updated event", updatedEvent}, 200);
    })

export default app;