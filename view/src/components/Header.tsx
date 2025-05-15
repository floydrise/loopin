import { Link, useLocation } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useSession } from "@/lib/auth_client.ts";
import { Brush, House, Telescope } from "lucide-react";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";
import { MenuDropdown } from "@/components/MenuDropdown.tsx";
import { useTheme } from "@/components/theme-provider.tsx";

export default function Header() {
  const { pathname } = useLocation();
  const { data } = useSession();
  const { theme } = useTheme();
  console.log(theme);
  return (
    <header className="p-4 mb-10 backdrop-blur-2xl gap-2 border-b-1">
      <nav className="flex flex-row justify-between items-center gap-4">
        <Link to={"/"}>
          <img src={"loopin_purple.png"} alt={"App logo"} className={"w-32"} />
        </Link>
        <div className={"flex gap-4 justify-center items-center"}>
          <div className={"md:flex gap-2 hidden items-center justify-center"}>
            {data?.user.role == "staff" ? (
              <Button
                className={"bg-violet-300 hover:bg-violet-300 hidden md:flex"}
                asChild
              >
                <Link to="/create">
                  <Brush /> Create
                </Link>
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
          </div>
          <MenuDropdown />
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
