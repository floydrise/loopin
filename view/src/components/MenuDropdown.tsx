import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brush, House, Menu, Telescope } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useSession } from "@/lib/auth_client.ts";

export function MenuDropdown() {
  const navigate = useNavigate();
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={"mx-2 focus:outline-none md:hidden"}>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"md:mt-2 mb-2"}>
        <DropdownMenuLabel className={"text-center text-muted-foreground"}>
          Menu
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: "/" })}>
          <House /> Home
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: "/experiences" })}>
          <Telescope /> Experiences
        </DropdownMenuItem>
        {data?.user.role == "staff" ? (
          <DropdownMenuItem onClick={() => navigate({ to: "/create" })}>
            <Brush /> Create
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
