import { auth } from "../auth";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  /*if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }*/

  if (!session) {
    return c.json({ msg: "Not authorised" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
