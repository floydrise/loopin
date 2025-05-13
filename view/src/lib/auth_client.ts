import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "../../../auth.ts";

export const { signIn, signOut, useSession } = createAuthClient({
  baseURL: "http://localhost:5173/",
  plugins: [inferAdditionalFields<typeof auth>()],
});
