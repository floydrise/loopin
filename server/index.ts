import { Hono } from "hono";
import eventsRoute from "./routes/events";
import { auth } from "../auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono()
  .use(logger())
  .basePath("/api")
  .notFound((c) => c.json({ msg: "Not found" }, 404))
  .get("/", (c) => {
    return c.json({ msg: "Howdy 🤠!" }, 200);
  })
  .route("/events", eventsRoute);
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
app.use(
  "/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3000", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
export type AppType = typeof app;
export default app;
