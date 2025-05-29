import { Link, useLocation } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useSession } from "@/lib/auth_client.ts";
import { Brush, House, LogIn, MapPin, Telescope } from "lucide-react";
import { ProfileDropdown } from "@/components/ProfileDropdown.tsx";
import { MenuDropdown } from "@/components/MenuDropdown.tsx";
import { useMediaQuery } from "usehooks-ts";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export default function Header() {
  const { pathname } = useLocation();
  const { data } = useSession();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const previous = scrollY.getPrevious();
    if (latestValue > previous!) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-140%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.5,
      }}
      className="p-2 bg-background/50 backdrop-blur-sm gap-2 rounded-full border fixed top-4 w-fit left-1/2 -translate-x-1/2 z-50"
    >
      <nav className="flex flex-row justify-between items-center gap-4">
        <Link to={"/"} className={"flex items-center"}>
          <MapPin className={"size-8"} />
          <h1 className={"text-lg"}>LoopIn</h1>
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
    </motion.header>
  );
}
