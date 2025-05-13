import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { eventSelectType } from "../../../server/types.ts";
import { Button } from "@/components/ui/button.tsx";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useSession } from "@/lib/auth_client.ts";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const ExperienceCard = ({ event }: { event: eventSelectType }) => {
  const { data } = useSession();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isTooLong = event.eventDescription!.length > 100;
  return (
    <Card className="w-full max-w-md overflow-hidden scale-95 transform transition duration-500 pt-0 hover:scale-100">
      <div className="relative h-48 pt-0 w-full overflow-hidden">
        <img
          src={event.eventImg!}
          alt="Card image"
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{event.eventName}</CardTitle>
        <CardDescription className={"flex gap-2"}>
          <span className={"flex items-center"}>
            <MapPin /> <p>{event.eventLocation}</p>
          </span>
          <span className={"flex items-center"}>
            <Calendar />
            <p>{event.eventDateStart.split("-").reverse().join("-")}</p>
          </span>
          <span className={"flex items-center"}>
            <Clock />
            <p>{event.eventTimeStart.split(":").slice(0, 2).join(":")}</p>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className={"flex-1"}>
        <p
          className={`text-sm text-muted-foreground ${isTooLong ? "hover:cursor-pointer" : null}`}
          onClick={() => {
            if (isTooLong) setIsOpen(true);
          }}
        >
          {event.eventDescription!.length > 100
            ? event?.eventDescription?.slice(0, 100) + " ..."
            : event.eventDescription}
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Description</DialogTitle>
              <DialogDescription>{event.eventDescription}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>£{event.eventPrice}</p>
        <div className={"flex gap-2"}>
          {data?.session ? <Button variant={"destructive"}>Edit</Button> : null}
          <Button
            onClick={() => {
              if (!data?.session) navigate({ to: "/login" });
            }}
            className={"bg-green-500 hover:bg-green-400"}
          >
            Buy
          </Button>
          <Button
            onClick={() => {
              if (!data?.session) navigate({ to: "/login" });
            }}
          >
            Subscribe
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;
