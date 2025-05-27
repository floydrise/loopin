import {
  createFileRoute,
  notFound,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEventByIdQueryOptions } from "@/lib/api.ts";
import { CalendarIcon, Clock, MapPin, Tag } from "lucide-react";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useSession } from "@/lib/auth_client.ts";
import {
  FacebookShareButton,
  ThreadsShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebook, FaThreads, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import SubscribeButton from "@/components/SubscribeButton.tsx";
import type { eventSelectType } from "../../../../server/types.ts";
import { createStripeSessionMutation } from "@/lib/mutations.tsx";

export const Route = createFileRoute("/experiences/$experienceId")({
  loader: ({ params: { experienceId } }) => {
    if (isNaN(Number(experienceId))) throw notFound();
  },
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        name: "description",
        content: "More info about the experience",
      },
      {
        title: "Event description • LoopIn",
      },
    ],
  }),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: authData } = useSession();
  const { experienceId } = Route.useParams();
  const { isLoading, isError, data, error } = useQuery(
    getEventByIdQueryOptions(experienceId),
  );
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const stripeMutation = createStripeSessionMutation();
  console.log(pathname);
  if (isLoading)
    return (
      <section
        className={"flex justify-center items-center flex-col gap-2 mt-30"}
      >
        <div className={"max-w-2xl px-2"}>
          <Skeleton className={"w-80 h-80 sm:w-140 sm:h-100"} />
        </div>
        <section className={"flex gap-4"}>
          {new Array(4).fill(0).map((_, index) => (
            <Skeleton key={index} className={"w-16 sm:w-20 h-4"} />
          ))}
        </section>
        <Skeleton className={"w-36 h-5"} />
        <article className={"sm:max-w-xl flex gap-2 flex-wrap"}>
          {new Array(58).fill(null).map((_, index) => (
            <Skeleton key={index} className={"w-3 h-3 rounded-full"} />
          ))}
        </article>
        <Skeleton className={"w-44 h-8"} />
      </section>
    );
  if (isError) return <p>Error: {error.message}</p>;
  const event = data?.event as eventSelectType;
  return (
    <section
      className={"flex justify-center items-center flex-col gap-2 mt-30"}
    >
      <div className={"max-w-2xl px-2"}>
        <img
          src={event?.eventImg!}
          alt={"Image representing the event"}
          className={"rounded-sm"}
        />
      </div>
      <section className={"flex gap-4"}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={
                  "flex text-sm md:text-base items-center text-muted-foreground"
                }
              >
                <MapPin className={"size-4 md:size-6"} />{" "}
                <p>{event?.eventLocation}</p>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Location</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={
                  "flex text-sm md:text-base items-center text-muted-foreground"
                }
              >
                <CalendarIcon className={"size-4 md:size-6"} />
                <p>{format(event?.eventDateStart!, "dd/MM/yyyy")}</p>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Date</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={
                  "flex text-sm md:text-base items-center text-muted-foreground"
                }
              >
                <Clock className={"size-4 md:size-6"} />
                <p>{event?.eventTimeStart.split(":").slice(0, 2).join(":")}</p>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                className={
                  "flex text-sm md:text-base items-center text-muted-foreground gap-1"
                }
              >
                <Tag className={"size-4 md:size-5"} />
                <p>
                  {event?.eventPrice == 0 ? "Free" : `£${event?.eventPrice}`}
                </p>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Price</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>
      <div className={"flex gap-4"}>
        <FacebookShareButton
          url={import.meta.env.VITE_BASE_URL! + pathname}
          htmlTitle={"Share on Facebook"}
          hashtag={"#attending"}
          className={"hover:animate-pulse"}
        >
          <FaFacebook className={"size-5"} />
        </FacebookShareButton>

        <TwitterShareButton
          url={import.meta.env.VITE_BASE_URL! + pathname}
          htmlTitle={"Share on X(Twitter)"}
          hashtags={["#attending", "#feelinggreat", "#happy", "#event"]}
          title={event?.eventName}
          className={"hover:animate-pulse"}
        >
          <FaXTwitter className={"size-5 stroke-gray-500"} />
        </TwitterShareButton>
        <ThreadsShareButton
          url={import.meta.env.VITE_BASE_URL! + pathname}
          title={event?.eventName}
          className={"hover:animate-pulse"}
          htmlTitle={"Share on Threads"}
        >
          <FaThreads className={"size-5"} />
        </ThreadsShareButton>
        <WhatsappShareButton
          url={import.meta.env.VITE_BASE_URL! + pathname}
          htmlTitle={"Share on WhatsApp"}
          title={event?.eventName}
          className={"hover:animate-pulse"}
        >
          <FaWhatsapp className={"size-5"} />
        </WhatsappShareButton>
      </div>
      <h1 className={"font-semibold text-2xl md:text-3xl"}>
        {event?.eventName}
      </h1>
      <article className={"max-w-2xl w-fit text-center md:text-left"}>
        {event?.eventDescription}
      </article>
      {event?.eventPrice == 0 ? (
        <section className={"flex flex-col justify-center items-center gap-1"}>
          <span className={"inline-flex gap-2"}>
            <p className={"max-w-md font-light text-sm text-center italic"}>
              You can register for this event for{" "}
              <span className={"underline"}>FREE</span> 🎉 ! Please, click the
              button.
            </p>
          </span>
          <SubscribeButton
            event={event}
            queryClient={queryClient}
            sessionData={authData!}
          />
        </section>
      ) : (
        <div className={"my-6 w-72"}>
          <Button
            className={"w-full"}
            onClick={() => {
              if (!authData?.user) {
                navigate({ to: "/login" });
              } else {
                stripeMutation.mutate({
                  eventName: event.eventName,
                  eventPrice: event.eventPrice,
                  eventImg: event.eventImg,
                });
              }
            }}
          >
            Purchase
          </Button>
        </div>
      )}
    </section>
  );
}
