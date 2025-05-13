import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";
import { FaGoogle, FaGithub } from "react-icons/fa6";

import { useState } from "react";
import { signIn } from "@/lib/auth_client.ts";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section className={"flex h-screen justify-center items-start"}>
      <div
        className={
          "m-auto border bg-slate-50 dark:bg-gray-900 min-h-[160px] p-4 w-[400px] mx-4 rounded-lg flex flex-col justify-center items-center gap-8"
        }
      >
        <Button
          disabled={isLoading}
          className={"w-full hover:cursor-pointer"}
          onClick={async () => {
            setIsLoading(true);
            await signIn.social({
              provider: "github",
              callbackURL: "http://localhost:5173/",
            });
          }}
        >
          <FaGithub className={"size-6"} /> Sign in with GitHub
        </Button>
        <Button
          disabled={isLoading}
          className={
            "w-full bg-red-800 hover:bg-red-700 hover:cursor-pointer text-white"
          }
          onClick={async () => {
            setIsLoading(true);
            await signIn.social({
              provider: "google",
              callbackURL: "http://localhost:5173/",
            });
          }}
        >
          <FaGoogle className={"size-6"} /> Sign in with Google
        </Button>
      </div>
    </section>
  );
}
