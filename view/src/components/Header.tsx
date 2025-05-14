import { Link, useLocation } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useSession } from "@/lib/auth_client.ts";
import { House, MapPinned, Telescope } from "lucide-react";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";

export default function Header() {
  const { pathname } = useLocation();
  const { data } = useSession();
  return (
    <header className="p-4 mb-10 backdrop-blur-2xl gap-2">
      <nav className="flex flex-row justify-between items-center gap-4">
        <Link to={"/"}>
          <MapPinned size={56} />
        </Link>
        <div className={"flex gap-4 justify-center items-center"}>
          {data?.user.role == "staff" ? (
            <Button
              className={"bg-violet-300 hover:bg-violet-300 hidden md:block"}
              asChild
            >
              <Link to="/create">Create</Link>
            </Button>
          ) : null}
          <Button
            variant={pathname == "/" ? "default" : "ghost"}
            className={"hidden md:flex"}
            asChild
          >
            <Link to="/">
              <House /> Home
            </Link>
          </Button>
          <Button
            variant={pathname == "/experiences" ? "default" : "ghost"}
            asChild
          >
            <Link to="/experiences">
              <Telescope /> Experiences
            </Link>
          </Button>
          {data?.user ? (
            <ProfileDropdown user={data.user} />
          ) : (
            <Button variant={"secondary"} asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
          <div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
