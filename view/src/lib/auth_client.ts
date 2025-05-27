import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "../../../auth.ts";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/",
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
