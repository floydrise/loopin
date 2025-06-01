import { Hono } from "hono";
import { Stripe } from "stripe";
import { zValidator } from "@hono/zod-validator";
import { eventUserTable, stripeInsertSchema } from "../db/schema";
import { authMiddleware } from "../auth-middleware";
import { db } from "../db";
import { and, eq } from "drizzle-orm";
import { Resend } from "resend";
import EmailTemplate from "../emails/email-template";
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);
const app = new Hono()
  .post(
    "/",
    zValidator("json", stripeInsertSchema),
    authMiddleware,
    async (c) => {
      const user = c.get("user");
      if (!user) return c.json({ msg: "Not authorised" }, 400);
      const { eventImg, eventName, eventPrice, eventId } = c.req.valid("json");
      try {
        const stripeSession = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: "gbp",
                product_data: {
                  name: eventName,
                  images: [eventImg!],
                },
                unit_amount: eventPrice * 100,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          currency: "gbp",
          payment_method_types: ["card", "paypal", "amazon_pay"],
          customer_email: user?.email,
          success_url: Bun.env.BETTER_AUTH_URL + "/paymentSuccess",
          cancel_url: Bun.env.BETTER_AUTH_URL + "/paymentCancel",
          metadata: {
            userId: user.id,
            eventId: eventId!,
          },
        });
        return c.json({ id: stripeSession.id });
      } catch (e) {
        console.log(e);
        return c.json({ msg: e }, 400);
      }
    },
  )
  .post("/webhook", async (c) => {
    const signature = c.req.header("stripe-signature");
    try {
      let event = await stripe.webhooks.constructEventAsync(
        await c.req.text(),
        signature!,
        Bun.env.STRIPE_WEBHOOK_SECRET!,
      );
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object as Stripe.Checkout.Session;
          const email = session.customer_email;
          const name = session.customer_details?.name;
          const metadata = session.metadata;
          const userId = metadata?.userId;
          const eventId = metadata?.eventId;
          if (!userId || !eventId) {
            console.error("Missing metadata in session");
            break;
          }
          const existing = await db
            .select()
            .from(eventUserTable)
            .where(
              and(
                eq(eventUserTable.userId, userId),
                eq(eventUserTable.eventId, Number(eventId)),
              ),
            )
            .limit(1);

          if (existing.length > 0) {
            console.log("Subscription already exists:", { userId, eventId });
            break;
          }
          const res = await db
            .insert(eventUserTable)
            .values({ userId, eventId: Number(eventId) })
            .returning()
            .then((res) => res[0]);
          const { data, error } = await resend.emails.send({
            from: "LoopIn <notifications@stefancodes.dev>",
            to: [email!],
            subject: "LoopIn experience 🌊",
            react: <EmailTemplate userName={name ?? email!} />,
          });

          if (error) {
            console.log(error);
          }
          return c.json({
            msg: "Successfully inserted subscription",
            subscription: res,
          });
        default:
          console.log(`Unhandled event type ${event.type}.`);
      }
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return c.json({ msg: "Error" }, 400);
    }

    return c.json({ msg: "Success" }, 200);
  });

export default app;
