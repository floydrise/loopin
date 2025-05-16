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

export function SubscriptionMenu() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className={"hover:cursor-pointer"} asChild>
          <CircleEllipsis size={20} className={"shrink-0"} />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0" align="start">
          <StatusList setOpen={setOpen} />
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
          <StatusList setOpen={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({ setOpen }: { setOpen: (open: boolean) => void }) {
  return (
    <Command>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                switch (value) {
                  case "delete":
                    console.log("Working delete");
                    break;
                  case "share":
                    console.log("Working share");
                    break;
                  case "addToGoogleCalendar":
                    console.log("Working addToGoogleCalendar");
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
