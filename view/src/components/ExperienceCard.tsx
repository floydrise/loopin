import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import type {
  eventSelectType,
  eventUpdateType,
} from "../../../server/types.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  BadgeAlert,
  CalendarIcon,
  Clock,
  Eraser,
  MapPin,
  Trash,
} from "lucide-react";
import { useSession } from "@/lib/auth_client.ts";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, patchEvent } from "@/lib/api.ts";
import { toast } from "sonner";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { eventUpdateSchema } from "../../../server/db/schema.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils.ts";
import { format } from "date-fns";
import { FieldInfo } from "@/routes/create.tsx";
import { useForm } from "@tanstack/react-form";
import SubscribeButton from "@/components/SubscribeButton.tsx";

const ExperienceCard = ({ event }: { event: eventSelectType }) => {
  const expDefVal: eventUpdateType = {
    eventName: event.eventName,
    eventDescription: event.eventDescription,
    eventImg: event.eventImg,
    eventPrice: event.eventPrice,
    eventLocation: event.eventLocation,
    eventDateStart: event.eventDateStart,
    eventTimeStart: event.eventTimeStart,
  };

  // format time from hh:mm:ss to hh:mm 👇🏻
  event.eventTimeStart = event.eventTimeStart.split(":").slice(0, 2).join(":");
  const isTooLong = event.eventDescription!.length > 100;

  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: expDefVal,
    onSubmit: async ({ value }) => {
      await patchEvent(event.eventId, value);
      await queryClient.invalidateQueries({ queryKey: ["fetch_events"] });
      setEditDialogIsOpen(false);
      toast.success("Successfully updated experience");
    },
  });

  // user data 👇🏻
  const { data } = useSession();
  const navigate = useNavigate();
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (id: number) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch_events"] });
      toast.success("Successfully deleted event!");
    },
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
  });
  return (
    <Card className="group w-full max-w-md overflow-hidden pt-0 scale-95 shadow-lg shadow-teal-200 dark:shadow-teal-900 dark:shadow-lg/60">
      <div className="group relative h-48 pt-0 w-full overflow-hidden bg-cover">
        <img
          src={event.eventImg!}
          alt="Card image"
          className="h-full w-full object-cover transition duration-1000 group-hover:scale-125"
        />
      </div>
      <CardHeader>
        <CardTitle>{event.eventName}</CardTitle>
        <CardDescription className={"flex gap-2"}>
          <span className={"flex items-center"} title={"Location"}>
            <MapPin /> <p>{event.eventLocation}</p>
          </span>
          <span className={"flex items-center"} title={"Date"}>
            <CalendarIcon />
            <p>{format(event.eventDateStart, "dd/MM/yyyy")}</p>
          </span>
          <span className={"flex items-center gap-1"} title={"Time"}>
            <Clock />
            <p>{event.eventTimeStart}</p>
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className={"flex-1"}>
        <p
          className={`text-sm text-muted-foreground ${isTooLong ? "hover:cursor-pointer" : null}`}
          onClick={() =>
            navigate({
              to: "/experiences/$experienceId",
              params: { experienceId: String(event.eventId) },
            })
          }
        >
          {isTooLong ? (
            <span>
              {event?.eventDescription?.slice(0, 90) + "... "}
              <span className={"font-semibold"}>Read more</span>
            </span>
          ) : (
            event.eventDescription
          )}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className={"font-bold inline-flex"}>
          {event.eventPrice == 0 ? "Free" : "£" + event.eventPrice}
        </p>
        <div className={"flex gap-2"}>
          {data?.user.role == "staff" ? (
            <div className={"flex gap-2"}>
              <AlertDialog>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <AlertDialogTrigger asChild>
                        <Button variant={"destructive"}>
                          <Trash />
                        </Button>
                      </AlertDialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete experience</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className={"flex items-center gap-1 "}>
                      <BadgeAlert className={"text-red-700"} /> Are you
                      absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this event and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        mutation.mutate(event.eventId);
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Dialog
                open={editDialogIsOpen}
                onOpenChange={setEditDialogIsOpen}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <Button className={"bg-teal-500 hover:bg-teal-400"}>
                          <Eraser />
                        </Button>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit experience</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Experience</DialogTitle>
                    <DialogDescription>
                      Make changes to the experience here. Click save when
                      you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <Separator />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      form.handleSubmit();
                    }}
                  >
                    <div className="grid w-full grid-cols-2 md:grid-cols-1 items-center gap-4">
                      <form.Field
                        name={"eventName"}
                        validators={{
                          onChange: eventUpdateSchema.shape.eventName,
                        }}
                        children={(field) => (
                          <>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor={field.name}>Name:</Label>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            </div>
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                      <form.Field
                        name={"eventDescription"}
                        validators={{
                          onChange: eventUpdateSchema.shape.eventDescription,
                        }}
                        children={(field) => (
                          <>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor={field.name}>Name:</Label>
                              <Textarea
                                id={field.name}
                                name={field.name}
                                value={field.state.value ?? ""}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            </div>
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                      <form.Field
                        name={"eventImg"}
                        validators={{
                          onChange: eventUpdateSchema.shape.eventImg,
                        }}
                        children={(field) => (
                          <>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor={field.name}>
                                Image URL (optional):
                              </Label>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value ?? ""}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            </div>
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                      <form.Field
                        name={"eventPrice"}
                        validators={{
                          onChange: eventUpdateSchema.shape.eventPrice,
                        }}
                        children={(field) => (
                          <>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor={field.name}>Price (in £):</Label>
                              <Input
                                type={"number"}
                                min={"0"}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(Number(e.target.value))
                                }
                              />
                            </div>
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                      <form.Field
                        name={"eventLocation"}
                        validators={{
                          onChange: eventUpdateSchema.shape.eventLocation,
                        }}
                        children={(field) => (
                          <>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor={field.name}>Location:</Label>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            </div>
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                      <form.Field
                        name={"eventDateStart"}
                        validators={{
                          onChange: eventUpdateSchema.shape.eventDateStart,
                        }}
                        children={(field) => (
                          <>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor={field.name}>Date:</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-fit",
                                      !field.state.value &&
                                        "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon />
                                    {field.state.value ? (
                                      format(field.state.value, "dd/MM/yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    id={field.name}
                                    mode="single"
                                    selected={new Date(field.state.value!)}
                                    onSelect={(date) =>
                                      field.handleChange(
                                        format(
                                          date ?? new Date(),
                                          "yyyy-MM-dd",
                                        ),
                                      )
                                    }
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                      <form.Field
                        name={"eventTimeStart"}
                        validators={{
                          onChange: eventUpdateSchema.shape.eventTimeStart,
                        }}
                        children={(field) => (
                          <>
                            <div className="flex flex-col space-y-1.5">
                              <Label htmlFor={field.name}>Start time:</Label>
                              <Input
                                type={"time"}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                className={"w-fit"}
                              />
                            </div>
                            <FieldInfo field={field} />
                          </>
                        )}
                      />
                    </div>
                    <form.Subscribe
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                      ]}
                      children={([canSubmit, isSubmitting]) => (
                        <Button
                          type={"submit"}
                          disabled={!canSubmit}
                          className={"w-full mt-6"}
                        >
                          {isSubmitting ? "..." : "Save changes"}
                        </Button>
                      )}
                    />
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          ) : null}
          <Link
            to={"/experiences/$experienceId"}
            params={{ experienceId: String(event.eventId) }}
          >
            <Button>View</Button>
          </Link>
          {event.eventPrice == 0 ? (
            <SubscribeButton
              event={event}
              queryClient={queryClient}
              sessionData={data!}
            />
          ) : (
            <Button
              onClick={() => {
                if (!data?.session) navigate({ to: "/login" });
              }}
              variant={"outline"}
            >
              Buy
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;
