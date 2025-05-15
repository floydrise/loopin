import { Hono } from "hono";
import { authMiddleware } from "../auth-middleware";
import { db } from "../db";
import { eventsTable, eventUserPostSchema, eventUserTable } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", authMiddleware, async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ msg: "Not authorised!" }, 401);
    const subscriptions = await db
      .select({ event: eventsTable })
      .from(eventsTable)
      .innerJoin(
        eventUserTable,
        eq(eventsTable.eventId, eventUserTable.eventId),
      )
      .where(eq(eventUserTable.userId, user.id));
    return c.json(subscriptions);
  })
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
