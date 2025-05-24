import { Hono } from "hono";
import { authMiddleware } from "../auth-middleware";
import { db } from "../db";
import { eventsTable, eventUserPostSchema, eventUserTable } from "../db/schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { coerce, object, string } from "zod";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      object({
        page: coerce.number().min(1),
      }),
    ),
    authMiddleware,
    async (c) => {
      const user = c.get("user");
      const { page } = c.req.valid("query");
      if (!user) return c.json({ msg: "Not authorised!" }, 401);
      const { createdAt, ...rest } = getTableColumns(eventsTable);
      const { subscriptionCreatedAt } = getTableColumns(eventUserTable);
      const limit = 4;
      const offset = (page - 1) * limit;

      const subscriptions = await db
        .select({ ...rest, subscriptionCreatedAt })
        .from(eventsTable)
        .innerJoin(
          eventUserTable,
          eq(eventsTable.eventId, eventUserTable.eventId),
        )
        .where(eq(eventUserTable.userId, user.id))
        .orderBy(desc(eventUserTable.subscriptionCreatedAt))
        .limit(limit + 1)
        .offset(offset);
      const paginatedSubscriptions = subscriptions.slice(0, limit);
      const hasNext = subscriptions.length > limit;
      return c.json({ subscriptions: paginatedSubscriptions, hasNext });
    },
  )
  .post(
    "/",
    zValidator("json", eventUserPostSchema),
    authMiddleware,
    async (c) => {
      const user = c.get("user");
      const validated = c.req.valid("json");
      if (user?.id != validated.userId)
        return c.json({ msg: "Forbidden" }, 403);
      const existing = await db
        .select()
        .from(eventUserTable)
        .where(
          and(
            eq(eventUserTable.userId, validated.userId),
            eq(eventUserTable.eventId, validated.eventId),
          ),
        )
        .limit(1); // optional for efficiency

      if (existing.length > 0) {
        return c.json({ msg: "Subscription already exists" }, 409);
      }
      const res = await db
        .insert(eventUserTable)
        .values(validated)
        .returning()
        .then((res) => res[0]);
      return c.json({
        msg: "Successfully inserted subscription",
        subscription: res,
      });
    },
  )
  .delete("/:id{[0-9]+}", authMiddleware, async (c) => {
    const { id } = c.req.param();
    const deleted = await db
      .delete(eventUserTable)
      .where(eq(eventUserTable.eventId, Number(id)))
      .returning()
      .then((res) => res[0]);
    if (!deleted) {
      return c.json({ msg: "Not found" }, 404);
    }
    return c.json(
      { msg: "Successfully deleted event!", deletedEventID: deleted.eventId },
      200,
    );
  });

export default app;
