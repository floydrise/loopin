import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "usehooks-ts";
import { Calendar, CircleEllipsis, Trash } from "lucide-react";
import { type ReactElement, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAccessTokenQueryOptions } from "@/lib/api.ts";
import {
  deleteMutation,
  postToGoogleCalendarMutation,
} from "@/lib/mutations.tsx";
import type { SubscriptionTicketType } from "../../../server/types.ts";

type Status = {
  value: string;
  label: string;
  icon: ReactElement;
};

const statuses: Status[] = [
  {
    value: "delete",
    label: "Delete",
    icon: <Trash />,
  },
  {
    value: "addToGoogleCalendar",
    label: "Add to Google Calendar",
    icon: <Calendar />,
  },
];

export function SubscriptionMenu({ event }: { event: SubscriptionTicketType }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data, isFetched } = useQuery(fetchAccessTokenQueryOptions);
  console.log(data?.data);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={"hover:cursor-pointer"} asChild>
          <CircleEllipsis size={20} className={"shrink-0"} />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="start">
          {isFetched && (
            <StatusList
              setOpen={setOpen}
              event={event}
              accessToken={data?.data?.accessToken}
              errorAccessToken={data?.error?.status}
            />
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <CircleEllipsis size={20} className={"shrink-0"} />
      </DrawerTrigger>
      <DrawerContent aria-describedby={"actions"}>
        <VisuallyHidden>
          <DrawerTitle>Actions</DrawerTitle>
        </VisuallyHidden>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            event={event}
            accessToken={data?.data?.accessToken}
            errorAccessToken={data?.error?.status}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  event,
  accessToken,
  errorAccessToken,
}: {
  setOpen: (open: boolean) => void;
  event: SubscriptionTicketType;
  accessToken: string | undefined;
  errorAccessToken: number | undefined;
}) {
  let filteredStatuses = [...statuses];
  if (errorAccessToken === 400)
    filteredStatuses = filteredStatuses.filter(
      (val) => val.value !== "addToGoogleCalendar",
    );

  const queryClient = useQueryClient();
  const deleteSubscription = deleteMutation(queryClient);
  const addToGoogleCalendar = postToGoogleCalendarMutation();
  console.log(event.eventDescription);
  return (
    <Command>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {filteredStatuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                switch (value) {
                  case "delete":
                    deleteSubscription.mutate(event.eventId);
                    break;
                  case "addToGoogleCalendar":
                    addToGoogleCalendar.mutate({ event, accessToken });
                    break;
                }
                setOpen(false);
              }}
              className={"my-2"}
            >
              {status.icon} {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
