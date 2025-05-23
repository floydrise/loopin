import { createFileRoute, Link } from "@tanstack/react-router";
import dollarImg from "/dollar.png";
import { Button } from "@/components/ui/button.tsx";
import { Binoculars, User } from "lucide-react";
import { useWindowSize } from "usehooks-ts";
import Confetti from "react-confetti";

export const Route = createFileRoute("/paymentSuccess")({
  component: RouteComponent,
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
        <div
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
        </div>
      </section>
    </>
  );
}
