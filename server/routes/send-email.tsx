import { Hono } from "hono";
import { Resend } from "resend";
import EmailTemplate from "../emails/email-template";
import { authMiddleware } from "../auth-middleware";
import DeleteUserTemplate from "../emails/delete-user-template";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const app = new Hono()
  .get("/", authMiddleware, async (c) => {
    const user = c.get("user");
    const { data, error } = await resend.emails.send({
      from: "LoopIn <notifications@stefancodes.dev>",
      to: [user!.email],
      subject: "LoopIn experience 🌊",
      react: <EmailTemplate userName={user!.name} />,
    });

    if (error) {
      return c.json(error, 400);
    }

    return c.json(data);
  })
  .post(
    "/deleteUser",
    zValidator(
      "json",
      z.object({
        url: z.string().url(),
        user_email: z.string().email(),
        user_name: z.string(),
      }),
    ),
    async (c) => {
      const { url, user_email, user_name } = c.req.valid("json");
      const { data, error } = await resend.emails.send({
        from: "LoopIn <notifications@stefancodes.dev>",
        to: [user_email],
        subject: "Delete LoopIn profile",
        react: <DeleteUserTemplate userName={user_name} url={url} />,
      });
      if (error) {
        return c.json(error, 400);
      }

      return c.json(data);
    },
  );

export default app;
