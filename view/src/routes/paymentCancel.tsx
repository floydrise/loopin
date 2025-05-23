import { createFileRoute, Link } from "@tanstack/react-router";
import noMoney from "/no-money.png";
import { Button } from "@/components/ui/button.tsx";
import { Binoculars, User } from "lucide-react";

export const Route = createFileRoute("/paymentCancel")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className={"h-screen w-screen flex justify-center items-center"}>
      <div
        className={
          "border p-10 md:p-20 mx-6 rounded-lg flex flex-col justify-center items-center bg-slate-50 dark:bg-primary-foreground gap-4 "
        }
      >
        <img
          src={noMoney}
          alt={"Image of the dollar sign"}
          className={"size-20"}
        />
        <div>
          <h1 className={"text-4xl font-bold text-center"}>
            Payment Cancelled
          </h1>
          <p className={"text-xl text-muted-foreground text-center"}>
            You were not charged
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
  );
}
