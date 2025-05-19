import { Hono } from "hono";
import eventsRoute from "./routes/events";
import subscriptionsRoute from "./routes/subscriptions";
import sendEmailRoute from "./routes/send-email";
import { auth } from "../auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono()
  .use("*", logger())
  .basePath("/api")
  .on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw))
  .use(
    "/auth/*",
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  )
  .notFound((c) => c.json({ msg: "Not found" }, 404))
  .get("/", (c) => {
    return c.json({ msg: "Howdy 🤠!" }, 200);
  })
  .route("/experiences", eventsRoute)
  .route("/subscriptions", subscriptionsRoute)
  .route("/send-email", sendEmailRoute);

export type AppType = typeof app;
export default app;
