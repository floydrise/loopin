import type { SubscriptionTicketType } from "../../../server/types.ts";
import { CalendarIcon, Clock, MapPin, Tag } from "lucide-react";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { SubscriptionMenu } from "@/components/SubscriptionMenu.tsx";

const SubscriptionTicket = ({ event }: { event: SubscriptionTicketType }) => {
  event.eventTimeStart = event.eventTimeStart!.split(":").slice(0, 2).join(":");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  return (
    <div
      className={
        "group flex max-w-md gap-2 border-1 bg-primary-foreground dark:bg-primary-foreground p-3 mx-2 rounded-lg shadow-lg shadow-violet-200 dark:shadow-violet-900 dark:shadow-lg/40"
      }
    >
      <div className={"group w-56 bg-cover overflow-hidden rounded-sm"}>
        <img
          src={event.eventImg!}
          alt={"Image of the event"}
          className={
            "rounded-sm w-full h-full object-cover transition duration-1000 group-hover:scale-125"
          }
        />
      </div>
      <div>
        <div className={"flex justify-center items-center gap-2"}>
          <h2
            className={"font-semibold text-base"}
            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
          >
            {event?.eventName.length > 12 ? (
              <TooltipProvider>
                <Tooltip open={tooltipIsOpen} onOpenChange={setTooltipIsOpen}>
                  <TooltipTrigger asChild>
                    <span>{event.eventName.slice(0, 12) + "..."}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{event.eventName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              event.eventName
            )}
          </h2>
          <SubscriptionMenu event={event} />
        </div>
        <span className={"flex items-center text-muted-foreground"}>
          <MapPin className={"size-5"} /> <p>{event.eventLocation}</p>
        </span>
        <span className={"flex items-center text-muted-foreground"}>
          <CalendarIcon className={"size-5"} />
          <p>{format(event.eventDateStart!, "dd/MM/yyyy")}</p>
        </span>
        <span className={"flex text-muted-foreground"}>
          <Clock className={"size-5"} />
          <p>{event.eventTimeStart}</p>
        </span>
        <span className={"flex text-muted-foreground"}>
          <Tag className={"size-5"} />
          <p>{event.eventPrice == 0 ? "Free" : "£" + event.eventPrice}</p>
        </span>
      </div>
    </div>
  );
};

export default SubscriptionTicket;
