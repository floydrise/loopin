import { Hono } from "hono";
import { db } from "../db";
import { eventsPostSchema, eventsTable, eventUpdateSchema } from "../db/schema";
import { count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { authMiddleware } from "../auth-middleware";
import { object, coerce, string } from "zod";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      object({
        page: coerce.number().min(1),
        search: string().optional(),
      }),
    ),
    async (c) => {
      const { page, search } = c.req.valid("query");
      const trimmedSearch = search?.trim();

      const whereClause =
        trimmedSearch && trimmedSearch !== ""
          ? or(
              sql`to_tsvector
              ('english', ${eventsTable.eventName})
              @@ plainto_tsquery('english',
              ${trimmedSearch}
              )`,
              ilike(eventsTable.eventName, `%${trimmedSearch}%`),
            )
          : undefined;
      const limit = 6;
      const offset = (page - 1) * limit;
      const events = await db
        .select()
        .from(eventsTable)
        .where(whereClause)
        .orderBy(desc(eventsTable.createdAt))
        .limit(limit + 1)
        .offset(offset);
      const { totalCount } = await db
        .select({ totalCount: count() })
        .from(eventsTable)
        .where(whereClause)
        .then((res) => res[0]);
      const hasNext = events.length > limit;
      const totalPages = Math.ceil(totalCount / limit);
      return c.json({
        events: events.slice(0, limit),
        page,
        hasNext,
        totalCount,
        totalPages,
      });
    },
  )
  .get("/:id{[0-9]+}", async (c) => {
    const { id } = c.req.param();
    const event = await db
      .select()
      .from(eventsTable)
      .where(eq(eventsTable.eventId, Number(id)));
    if (event.length == 0) {
      return c.json({ msg: "Not found" }, 404);
    }
    return c.json({ event: event[0] });
  })
  .delete("/:id{[0-9]+}", authMiddleware, async (c) => {
    const user = c.get("user");
    if (!user || user.role != "staff")
      return c.json({ msg: "Not authorised to do this action!" }, 400);
    const { id } = c.req.param();
    const deletedEvent = await db
      .delete(eventsTable)
      .where(eq(eventsTable.eventId, Number(id)))
      .returning()
      .then((res) => res[0]);
    if (!deletedEvent) {
      return c.json({ msg: "Not found" }, 404);
    }
    return c.json(
      { msg: "Successfully deleted event!", deletedEvent: deletedEvent },
      200,
    );
  })
  .post(
    "/",
    zValidator("json", eventsPostSchema),
    authMiddleware,
    async (c) => {
      const user = c.get("user");
      if (!user || user.role != "staff")
        return c.json({ msg: "Not authorised to do this action!" }, 400);
      const validated = c.req.valid("json");
      const newEvent = await db
        .insert(eventsTable)
        .values(validated)
        .returning()
        .then((res) => res[0]);
      return c.json({ newEvent }, 201);
    },
  )
  .patch(
    "/:id{[0-9]+}",
    zValidator("json", eventUpdateSchema),
    authMiddleware,
    async (c) => {
      const user = c.get("user");
      if (!user || user.role != "staff")
        return c.json({ msg: "Not authorised to do this action!" }, 400);
      const { id } = c.req.param();
      const validated = c.req.valid("json");
      const updatedEvent = await db
        .update(eventsTable)
        .set(validated)
        .where(eq(eventsTable.eventId, Number(id)))
        .returning()
        .then((res) => res[0]);
      return c.json({ msg: "Successfully updated event", updatedEvent }, 200);
    },
  );

export default app;
