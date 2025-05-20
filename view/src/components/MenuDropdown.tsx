import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Brush,
  House,
  LogIn,
  LogOut,
  Menu,
  Telescope,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { signOut, useSession } from "@/lib/auth_client.ts";
import { useState } from "react";

export function MenuDropdown() {
  const navigate = useNavigate();
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={"mx-2 focus:outline-none md:hidden"}>
        <Menu />
      </SheetTrigger>
      <SheetContent className={""}>
        <SheetHeader>
          <SheetTitle>Navigation menu</SheetTitle>
          <SheetDescription>Choose an item from the list</SheetDescription>
        </SheetHeader>
        <div className={"flex flex-col justify-between h-full"}>
          <div>
            <div
              className={`flex py-3 border-t border-b ${pathname == "/" ? "bg-primary-foreground" : null}`}
              onClick={async () => {
                setIsOpen(false);
                await navigate({ to: "/" });
              }}
            >
              <House className={"ml-2"} />{" "}
              <p className={"font-semibold"}>Home</p>
            </div>
            <div
              className={`flex py-3 border-b ${pathname == "/experiences" ? "bg-primary-foreground" : null}`}
              onClick={async () => {
                setIsOpen(false);
                await navigate({ to: "/experiences" });
              }}
            >
              <Telescope className={"ml-2"} />{" "}
              <p className={"font-semibold"}>Experiences</p>
            </div>
            {data?.user.role == "staff" ? (
              <div
                className={`flex py-3 border-b ${pathname == "/create" ? "bg-primary-foreground" : null}`}
                onClick={async () => {
                  setIsOpen(false);
                  await navigate({ to: "/create" });
                }}
              >
                <Brush className={"ml-2"} />{" "}
                <p className={"font-semibold"}>Create</p>
              </div>
            ) : null}
          </div>
          <div>
            {data?.user ? (
              <>
                <div
                  className={`flex py-3 border-b ${pathname == "/profile" ? "bg-primary-foreground" : null}`}
                  onClick={async () => {
                    setIsOpen(false);
                    await navigate({ to: "/profile" });
                  }}
                >
                  <User className={"ml-2"} />{" "}
                  <p className={"font-semibold"}>Profile</p>
                </div>
                <div
                  className={"flex py-3"}
                  onClick={async () => {
                    setIsOpen(false);
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          navigate({ to: "/" });
                        },
                      },
                    });
                  }}
                >
                  <LogOut className={"ml-2"} />{" "}
                  <p className={"font-semibold"}>Log out</p>
                </div>
              </>
            ) : (
              <div
                className={`flex py-3 border-t ${pathname == "/login" ? "bg-primary-foreground" : null}`}
                onClick={async () => {
                  setIsOpen(false);
                  await navigate({ to: "/login" });
                }}
              >
                <LogIn className={"ml-2"} />{" "}
                <p className={"font-semibold"}>Log in</p>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
