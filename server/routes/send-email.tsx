import { Hono } from "hono";
import { Resend } from "resend";
import EmailTemplate from "../emails/email-template";
import { authMiddleware } from "../auth-middleware";

const app = new Hono();
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/", authMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ msg: "Not authenticated" }, 400);
  const { data, error } = await resend.emails.send({
    from: "LoopIn <notifications@stefancodes.dev>",
    to: [user.email],
    subject: "LoopIn experience 🌊",
    react: <EmailTemplate userName={user.name} />,
  });

  if (error) {
    return c.json(error, 400);
  }

  return c.json(data);
});

export default app;
