import { Hono } from "hono";
import { Stripe } from "stripe";
import { zValidator } from "@hono/zod-validator";
import { stripeInsertSchema } from "../db/schema";
import { authMiddleware } from "../auth-middleware";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

const app = new Hono().post(
  "/",
  zValidator("json", stripeInsertSchema),
  authMiddleware,
  async (c) => {
    const user = c.get("user");
    if (!user) return c.json({ msg: "Not authorised" }, 400);
    const { eventImg, eventName, eventPrice } = c.req.valid("json");
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
        payment_method_types: ["card", "paypal"],
        customer_email: user?.email,
        success_url: "http://localhost:5173/paymentSuccess",
        cancel_url: "http://localhost:5173/paymentCancel",
      });
      return c.json({ id: stripeSession.id });
    } catch (e) {
      console.log(e);
      return c.json({ msg: e }, 400);
    }
  },
);

export default app;
