import {Hono} from 'hono'
import eventsRoute from "./routes/events";
import {auth} from "../auth";

const app = new Hono()
    .basePath("/api")
    .notFound((c) => c.json({msg: "Not found"}, 404)).get('/', (c) => {
        return c.json({msg: "Howdy 🤠!"}, 200);
    })
    .route("/events", eventsRoute)
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));
export type AppType = typeof app;
export default app
