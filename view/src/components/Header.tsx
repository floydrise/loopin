import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Button } from "@/components/ui/button.tsx";
import { signOut, useSession } from "@/lib/auth_client.ts";

export default function Header() {
  const { pathname } = useLocation();
  const { data } = useSession();
  const navigate = useNavigate();
  return (
    <header className="p-4 mb-10 backdrop-blur-2xl gap-2">
      <nav className="flex flex-row justify-between items-center gap-4">
        <Link to={"/"}>
          <img
            src={"/LoopIn_logo.png"}
            alt={"Logo of our company"}
            className={"w-24 md:w-32"}
          />
        </Link>
        <div className={"flex gap-4 justify-center items-center"}>
          <Button
            variant={pathname == "/" ? "default" : "ghost"}
            className={"hidden"}
            asChild
          >
            <Link to="/">Home</Link>
          </Button>
          <Button
            variant={pathname == "/experiences" ? "default" : "ghost"}
            asChild
          >
            <Link to="/experiences">Experiences</Link>
          </Button>
          {data?.session ? (
            <Button
              variant={"outline"}
              onClick={async () =>
                await signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      navigate({ to: "/" });
                    },
                  },
                })
              }
            >
              Log out
            </Button>
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
