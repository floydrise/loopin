import { createFileRoute } from "@tanstack/react-router";
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
import { useState } from "react";
import { format } from "date-fns";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [date, setDate] = useState<Date>();
  return (
    <section className={"mb-10 px-6"}>
      <Card className="max-w-md m-auto">
        <CardHeader>
          <CardTitle className={"flex items-center gap-2"}>
            <Pen /> Create a new experience
          </CardTitle>
          <CardDescription className={"flex items-center gap-2"}>
            Fill the form below <Pointer size={18} className={"rotate-180"} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name:</Label>
                <Input id="name" placeholder="e.g. 'Download'" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description:</Label>
                <Textarea
                  rows={6}
                  id="description"
                  placeholder="e.g. 'Best rock fest'"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="imgUrl">Image URL (optional):</Label>
                <Input id="imgUrl" placeholder="https://www.example.com/" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price (in £):</Label>
                <Input type={"number"} id="price" placeholder="e.g. 100" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="location">Location:</Label>
                <Input id="location" placeholder="e.g. 'London'" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Date:</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="time">Start time:</Label>
                <Input type={"time"} id="time" className={"w-fit"} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className={"w-full"}>Submit</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
