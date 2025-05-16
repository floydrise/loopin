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
    <div className={"flex max-w-md gap-2 border-2 p-3 mx-2 rounded-lg"}>
      <div className={"w-56 "}>
        <img
          src={event.eventImg!}
          alt={"Image of the event"}
          className={"rounded-xs"}
        />
      </div>
      <div>
        <div className={"flex justify-center items-center gap-2"}>
          <h2
            className={"font-semibold text-base"}
            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
          >
            {event?.eventName.length > 10 ? (
              <TooltipProvider>
                <Tooltip open={tooltipIsOpen} onOpenChange={setTooltipIsOpen}>
                  <TooltipTrigger asChild>
                    <span>{event.eventName.slice(0, 9) + "..."}</span>
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
          <SubscriptionMenu />
        </div>
        <span className={"flex items-center text-muted-foreground"}>
          <MapPin /> <p>{event.eventLocation}</p>
        </span>
        <span className={"flex items-center text-muted-foreground"}>
          <CalendarIcon />
          <p>{format(event.eventDateStart!, "dd/MM/yyyy")}</p>
        </span>
        <span className={"flex text-muted-foreground"}>
          <Clock />
          <p>{event.eventTimeStart}</p>
        </span>
        <span className={"flex text-muted-foreground"}>
          <Tag />
          <p>{event.eventPrice == 0 ? "Free" : "£" + event.eventPrice}</p>
        </span>
      </div>
    </div>
  );
};

export default SubscriptionTicket;
