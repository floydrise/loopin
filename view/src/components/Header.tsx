import {Link, useLocation} from '@tanstack/react-router'
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Header() {
    const {pathname} = useLocation();
    console.log(location);
    return (
        <header className="p-4 mb-10 backdrop-blur-2xl gap-2">
            <nav className="flex flex-row justify-between items-center gap-4">
                <Link to={"/"}>
                    <img src={"/LoopIn_logo.png"} alt={"Logo of our company"}
                         className={"w-24 md:w-32 animate-bounce"}/>
                </Link>
                <div className={"flex gap-4 justify-center items-center"}>
                    <Button variant={pathname == "/" ? "default" : "ghost"} asChild>
                        <Link to="/">Home</Link>
                    </Button>
                    <Button variant={pathname == "/experiences" ? "default" : "ghost"} asChild>
                        <Link to="/experiences">Experiences</Link>
                    </Button>
                    <div>
                        <ModeToggle/>
                    </div>
                </div>
            </nav>
        </header>
    )
}
