import { createFileRoute, Link } from "@tanstack/react-router";
import dollarImg from "/dollar.webp";
import { Button } from "@/components/ui/button.tsx";
import { Binoculars, User } from "lucide-react";
import { useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";
import { motion } from "motion/react";

export const Route = createFileRoute("/paymentSuccess")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Stripe payment success",
      },
      {
        title: "Payment success • LoopIn",
      },
    ],
  }),
});

function RouteComponent() {
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
      />
      <section className={"h-screen w-screen flex justify-center items-center"}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.3 },
          }}
          className={
            "border p-10 md:p-20 mx-6 rounded-lg flex flex-col justify-center items-center bg-slate-50 dark:bg-primary-foreground gap-4 "
          }
        >
          <img
            src={dollarImg}
            alt={"Image of the dollar sign"}
            className={"size-20"}
          />
          <div>
            <h1 className={"text-4xl font-bold text-center"}>
              Payment Successful
            </h1>
            <p className={"text-xl text-muted-foreground text-center"}>
              Thank you for your purchase
            </p>
          </div>
          <div className={"flex flex-col md:flex-row items-center gap-4"}>
            <Link
              to={"/experiences"}
              className={
                "transition ease-in-out duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:scale-105"
              }
            >
              <Button>
                <Binoculars /> Continue exploring
              </Button>
            </Link>
            <Link
              to={"/profile"}
              className={
                "transition ease-in-out duration-300 hover:-translate-y-1 hover:translate-x-1 hover:scale-105"
              }
            >
              <Button>
                <User /> Go to profile
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
