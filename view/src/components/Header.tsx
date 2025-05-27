import { Link, useLocation } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useSession } from "@/lib/auth_client.ts";
import { Brush, House, LogIn, Telescope } from "lucide-react";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";
import { MenuDropdown } from "@/components/MenuDropdown.tsx";
import logo from "/loopin_purple.webp?url";
import { useMediaQuery } from "usehooks-ts";

export default function Header() {
  const { pathname } = useLocation();
  const { data } = useSession();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <header className="p-4 backdrop-blur-lg gap-2 rounded-b-md fixed top-0 w-full z-50">
      <nav className="flex flex-row justify-between items-center gap-4">
        <Link to={"/"}>
          <img src={logo} alt={"App logo"} className={"w-32"} />
        </Link>
        <div className={"flex gap-4 justify-center items-center"}>
          <div className={"md:flex gap-2 hidden items-center justify-center"}>
            <Button
              variant={pathname == "/" ? "outline" : "ghost"}
              className={"hidden md:flex"}
              asChild
            >
              <Link to="/">
                <House /> Home
              </Link>
            </Button>
            <Button
              variant={pathname == "/experiences" ? "outline" : "ghost"}
              asChild
            >
              <Link to="/experiences">
                <Telescope /> Experiences
              </Link>
            </Button>
            {data?.user.role == "staff" ? (
              <Button
                variant={pathname == "/create" ? "outline" : "ghost"}
                asChild
              >
                <Link to="/create">
                  <Brush /> Create
                </Link>
              </Button>
            ) : null}
          </div>
          <MenuDropdown />
          {isDesktop &&
            (data?.user ? (
              <ProfileDropdown user={data.user} />
            ) : (
              <Button
                variant={pathname == "/login" ? "default" : "ghost"}
                asChild
              >
                <Link to="/login">
                  <LogIn /> Login
                </Link>
              </Button>
            ))}
          <div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
