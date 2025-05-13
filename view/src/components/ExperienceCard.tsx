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
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { eventSelectType } from "../../../server/types.ts";
import { Button } from "@/components/ui/button.tsx";
import { Brush, Calendar, Clock, MapPin, Trash } from "lucide-react";
import { useSession } from "@/lib/auth_client.ts";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const ExperienceCard = ({ event }: { event: eventSelectType }) => {
  const { data } = useSession();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isTooLong = event.eventDescription!.length > 100;
  return (
    <Card className="w-full max-w-md overflow-hidden pt-0 scale-95 transform transition duration-500 hover:scale-100">
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
          <span className={"flex items-center gap-1"}>
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
          {isTooLong ? (
            <p>
              {event?.eventDescription?.slice(0, 90) + "... "}
              <span className={"font-bold"}>Read more</span>
            </p>
          ) : (
            event.eventDescription
          )}
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <div className="relative rounded-sm h-60 pt-0 w-full overflow-hidden">
              <img
                src={event.eventImg!}
                alt="Card image"
                className="h-full w-full object-cover"
              />
            </div>
            <DialogHeader>
              <DialogTitle>Description</DialogTitle>
              <DialogDescription>{event.eventDescription}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className={"font-bold"}>Price: £{event.eventPrice}</p>
        <div className={"flex gap-2"}>
          {data?.user.role == "staff" ? (
            <div className={"flex gap-2"}>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant={"destructive"}>
                    <Trash />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this event and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button className={"bg-violet-300 hover:bg-violet-300"}>
                <Brush />
              </Button>
            </div>
          ) : null}
          <Button
            onClick={() => {
              if (!data?.session) navigate({ to: "/login" });
            }}
            variant={"outline"}
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
