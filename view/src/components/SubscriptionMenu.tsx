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
import { Calendar, CircleEllipsis, Rocket, Trash } from "lucide-react";
import { type ReactElement, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAccessTokeQueryOptions } from "@/lib/api.ts";
import { deleteMutation } from "@/lib/mutations.tsx";

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
    value: "share",
    label: "Share",
    icon: <Rocket />,
  },
  {
    value: "addToGoogleCalendar",
    label: "Add to Google Calendar",
    icon: <Calendar />,
  },
];

export function SubscriptionMenu({ eventId }: { eventId: number }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data, isFetched } = useQuery(fetchAccessTokeQueryOptions);
  const accessToken = data?.data?.accessToken;
  const errorAccessToken = data?.error?.status;

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
              eventId={eventId}
              accessToken={accessToken}
              errorAccessToken={errorAccessToken}
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
            eventId={eventId}
            accessToken={accessToken}
            errorAccessToken={errorAccessToken}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  eventId,
  accessToken,
  errorAccessToken,
}: {
  setOpen: (open: boolean) => void;
  eventId: number;
  accessToken: string | undefined;
  errorAccessToken: number | undefined;
}) {
  let filteredStatuses = [...statuses];
  if (errorAccessToken == 400)
    filteredStatuses = filteredStatuses.filter(
      (val) => val.value !== "addToGoogleCalendar",
    );
  const queryClient = useQueryClient();
  const deleteSubscription = deleteMutation(queryClient);
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
                    deleteSubscription.mutate(eventId);
                    break;
                  case "share":
                    console.log("Working share");
                    break;
                  case "addToGoogleCalendar":
                    console.log(accessToken);
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
