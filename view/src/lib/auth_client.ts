import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "../../../auth.ts";

export const authClient = createAuthClient({
  baseURL: "https://loopin-ch74.onrender.com/",
  plugins: [inferAdditionalFields<typeof auth>()],
});
export const {
  signIn,
  signOut,
  useSession,
  getAccessToken,
  getSession,
  deleteUser,
} = authClient;
export type Session = typeof authClient.$Infer.Session;
