import { createFileRoute, Link } from "@tanstack/react-router";
import { Highlight } from "@/components/ui/hero-highlight.tsx";
import { motion } from "motion/react";
import targetImg from "/target.webp";
import pinImg from "/pin.webp";
import dancingImg from "/dancing.webp";
import checkImg from "/check.webp";
import talkingImg from "/talking.webp";
import ticketImg from "/ticket.webp";
import { Button } from "@/components/ui/button.tsx";
import { Flame } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getEventsQueryOptions } from "@/lib/api.ts";
import { toast } from "sonner";
import ExperienceCard from "@/components/ExperienceCard.tsx";
import type { eventSelectType } from "../../../server/types.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { lazy, Suspense } from "react";

const Testimonials = lazy(() => import("../components/Testimonials.tsx"));

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "Home page of LoopIn",
      },
      {
        title: "Home • LoopIn",
      },
    ],
  }),
});

function App() {
  const { isLoading, isError, data, error } = useQuery(
    getEventsQueryOptions(1, "")
  );
  if (isError) {
    toast.error("An error occurred: " + error);
  }
  const events = data?.events;
  return (
    <>
      <section className="relative h-80 md:h-100 overflow-hidden">
        <div className="absolute inset-0 bg-violet-400 z-10" />
        <div className="absolute inset-0 top-16 flex flex-col justify-center items-center z-20 text-center px-4">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
            src={ticketImg}
            alt={"Image of a ticket"}
            className={"size-24 md:size-30"}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-2xl md:text-4xl lg:text-5xl text-white font-bold max-w-4xl leading-relaxed lg:leading-snug"
          >
            Discover Events That Inspire{" "}
            <span className="hidden md:inline-flex">You</span>
            <br />
            <Highlight className="text-xl md:text-4xl">
              Browse, join, or host events easily.
            </Highlight>
          </motion.h1>
        </div>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
        <g fill="#a684ff">
          <path
            d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
            opacity=".5"
          ></path>
          <path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path>
        </g>
      </svg>
      <section className={"container mt-2 md:mt-6 m-auto "}>
        <div className={"w-fit z-10 flex items-center gap-2 md:mb-4 ml-4"}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
            className={
              "text-2xl md:text-3xl lg:text-4xl font-semibold inline-flex items-center"
            }
          >
            <img
              src={targetImg}
              alt={"Image of a target"}
              className={"size-10"}
            />{" "}
            Latest
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
          >
            <Link to={"/experiences"}>
              <Button size={"sm"}>
                <Flame /> View all
              </Button>
            </Link>
          </motion.div>
        </div>
        <div
          className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2"}
        >
          {isLoading
            ? new Array(6)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className={"w-100 h-100"} />
                ))
            : events?.map((event) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    scale: { type: "spring", visualDuration: 0.6, bounce: 0.1 },
                  }}
                  className={"h-full"}
                >
                  <ExperienceCard
                    key={event.eventId}
                    event={event as eventSelectType}
                  />
                </motion.div>
              ))}
        </div>
      </section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        className={"rotate-180"}
      >
        <g fill="#a684ff">
          <path
            d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
            opacity=".5"
          ></path>
          <path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path>
        </g>
      </svg>
      <section
        className={
          "bg-violet-400 py-10 flex flex-col md:flex-row gap-4 justify-center md:justify-evenly items-center"
        }
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
            viewport={{ once: true, amount: 0.6 }}
            className={"text-2xl md:text-3xl lg:text-4xl flex items-center"}
          >
            <img src={pinImg} alt={"Image of a pin"} className={"size-8"} /> How
            it works
          </motion.h1>
          <div className={"grid grid-cols-1 ml-4"}>
            <ul className={"text-2xl font-light"}>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: [20, -5, 0] }}
                transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
                viewport={{ once: true, amount: 0.6 }}
                className={"flex gap-2 items-center"}
              >
                <img src={checkImg} alt={"Check icon"} className={"size-8"} />
                Browse Events
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: [20, -5, 0] }}
                transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
                viewport={{ once: true, amount: 0.6 }}
                className={"flex gap-2 items-center"}
              >
                <img src={checkImg} alt={"Check icon"} className={"size-8"} />
                Sign Up or Buy Tickets
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: [20, -5, 0] }}
                transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
                viewport={{ once: true, amount: 0.6 }}
                className={"flex gap-2 items-center"}
              >
                <img src={checkImg} alt={"Check icon"} className={"size-8"} />
                Sync to Google Calendar
              </motion.li>
            </ul>
          </div>
        </div>
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          src={dancingImg}
          alt={"People dancing"}
          className={"w-72 md:w-96 rounded-lg"}
        />
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100">
        <g fill="#a684ff">
          <path
            d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
            opacity=".5"
          ></path>
          <path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path>
        </g>
      </svg>
      <section className={"flex flex-col justify-center items-center"}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ once: true, amount: 0.6 }}
          className={"text-2xl lg:text-4xl flex items-center gap-2"}
        >
          <img src={talkingImg} alt={"Image of a pin"} className={"size-10"} />
          Check what others have to say
        </motion.h1>
        <Suspense
          fallback={
            <p className={"text-muted-foreground"}>Loading testimonials ...</p>
          }
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 1, ease: [0.4, 0.0, 0.2, 1] }}
            viewport={{ once: true, amount: 0.6 }}
          >
            <Testimonials />
          </motion.div>
        </Suspense>
      </section>
      <footer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          className={"rotate-180"}
        >
          <g fill="#a684ff">
            <path
              d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
              opacity=".5"
            ></path>
            <path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path>
          </g>
        </svg>
        <section
          className={
            "h-20 bg-violet-400 flex justify-center items-center gap-2"
          }
        >
          <p>Copyright © Stefan Petrov 2025</p>
          <Link to={"/privacy_policy"} className={"underline"}>
            Privacy Policy
          </Link>
        </section>
      </footer>
    </>
  );
}
