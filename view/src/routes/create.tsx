import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Pen, Pointer } from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator.tsx";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import type { eventInsertType } from "../../../server/types.ts";
import { eventsPostSchema } from "../../../server/db/schema.ts";
import { postEvent } from "@/lib/api.ts";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

const expDefVal: eventInsertType = {
  eventName: "",
  eventDescription: "",
  eventImg: undefined,
  eventPrice: 0,
  eventLocation: "",
  eventDateStart: "",
  eventTimeStart: "",
};

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className={"text-red-500"}>
          • {field.state.meta.errors.map((err) => err.message).join(",")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: expDefVal,
    onSubmit: async ({ value }) => {
      await postEvent(value);
      await queryClient.invalidateQueries({ queryKey: ["fetch_events"] });
      toast.success("Successfully created new experience");
      await navigate({ to: "/experiences" });
    },
  });
  return (
    <section className={"mb-10 px-6"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Card className="max-w-xl m-auto">
          <CardHeader>
            <CardTitle className={"flex items-center gap-2"}>
              <Pen /> Create a new experience
            </CardTitle>
            <CardDescription className={"flex items-center gap-2"}>
              Fill the form below <Pointer size={18} className={"rotate-180"} />
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <form.Field
                name={"eventName"}
                validators={{
                  onChange: eventsPostSchema.shape.eventName,
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
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g. 'Download'"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                )}
              />
              <form.Field
                name={"eventDescription"}
                validators={{
                  onChange: eventsPostSchema.shape.eventDescription,
                }}
                children={(field) => (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={field.name}>Name:</Label>
                      <Textarea
                        rows={10}
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g. 'Best rock fest'"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                )}
              />
              <form.Field
                name={"eventImg"}
                validators={{
                  onChange: eventsPostSchema.shape.eventImg,
                }}
                children={(field) => (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={field.name}>Image URL (optional):</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://www.example.com/"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                )}
              />
              <form.Field
                name={"eventPrice"}
                validators={{
                  onChange: eventsPostSchema.shape.eventPrice,
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
                        placeholder="e.g. 100"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                )}
              />
              <form.Field
                name={"eventLocation"}
                validators={{
                  onChange: eventsPostSchema.shape.eventLocation,
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
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="e.g. 'London'"
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                )}
              />
              <form.Field
                name={"eventDateStart"}
                validators={{
                  onChange: eventsPostSchema.shape.eventDateStart,
                }}
                children={(field) => (
                  <>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor={field.name}>Date:</Label>
                      <Popover>
                        <PopoverTrigger asChild id={field.name}>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start text-left font-normal",
                              !field.state.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon />
                            {field.state.value ? (
                              format(field.state.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={new Date(field.state.value)}
                            onSelect={(date) =>
                              field.handleChange(
                                format(date ?? new Date(), "yyyy-MM-dd"),
                              )
                            }
                            initialFocus
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
                  onChange: eventsPostSchema.shape.eventTimeStart,
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
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={"w-fit"}
                      />
                    </div>
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
          </CardContent>
          <Separator />
          <CardFooter className={"flex justify-between gap-2"}>
            <Button
              type="button"
              onClick={() => {
                form.reset();
              }}
              variant={"outline"}
              className={"w-1/2"}
            >
              Reset
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type={"submit"}
                  disabled={!canSubmit}
                  className={"w-1/2"}
                >
                  {isSubmitting ? "..." : "Submit"}
                </Button>
              )}
            />
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
