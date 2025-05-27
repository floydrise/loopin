import { createFileRoute, Link } from "@tanstack/react-router";
import byeImg from "/goodbye.webp";
import { Button } from "@/components/ui/button.tsx";
import { Home } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/goodbye")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Goodbye, sorry to see you go :'("
      },
      {
        title: "Goodbye • LoopIn"
      }
    ]
  }),
});

function RouteComponent() {
  return (
    <section className={"h-screen w-screen flex justify-center items-center"}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
        }}
        className={
          "border p-10 mx-6 rounded-lg flex flex-col justify-center items-center bg-slate-50 dark:bg-primary-foreground gap-4 "
        }
      >
        <img
          src={byeImg}
          alt={"Image of a waving hand and a sign saying 'goodbye'"}
          className={"size-20"}
        />
        <div>
          <h1 className={"text-4xl font-bold text-center"}>
            Sorry to see you go 😞
          </h1>
          <p className={"text-xl text-center text-muted-foreground"}>
            Confirmation link sent! Check your spam folder
          </p>
          <p className={"text-light text-red-500 text-center italic"}>
            If you don't click the link in your email, your account will continue to
            exist!
          </p>
        </div>
        <div className={"flex flex-col md:flex-row items-center gap-4"}>
          <Link
            to={"/"}
            className={
              "transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-105"
            }
          >
            <Button>
              <Home /> Go home
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
