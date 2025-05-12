import {Hono} from 'hono'
import eventsRoute from "./routes/events";

const app = new Hono().basePath("/api").notFound((c) => c.json({msg: "Not found"}, 404));

app.get('/', (c) => {
    return c.json({msg: "Howdy 🤠!"}, 200);
});
app.route("/events", eventsRoute);

export default app
