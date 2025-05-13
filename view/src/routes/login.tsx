import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";
import { FaGoogle, FaGithub } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { signIn } from "@/lib/auth_client.ts";
import { Separator } from "@/components/ui/separator.tsx";
import { Bot, Handshake, Heart } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section className={"m-auto px-2 max-w-sm md:max-w-md"}>
      <Card>
        <CardHeader>
          <CardTitle
            className={"text-xl justify-center items-center flex gap-1"}
          >
            <Handshake /> Sign in
          </CardTitle>
          <CardDescription className={"m-auto flex gap-1 items-center"}>
            <Bot className={"animate-spin [animation-duration:4s]"} /> Log in
            using your existing accounts:
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className={"flex flex-col gap-4"}>
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
            variant={"outline"}
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
        </CardContent>
        <CardFooter>
          <p className={"italic font-light m-auto inline-flex gap-1"}>
            Thanks for using our services! <Heart />
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
