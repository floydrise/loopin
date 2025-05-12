import {Link} from '@tanstack/react-router'
import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Header() {
    return (
        <header className="p-2 border gap-2">
            <nav className="flex flex-row justify-start items-center gap-4">
                <Button variant={"default"}>
                    <Link to="/">Home</Link>
                </Button>
                <div>
                    <ModeToggle/>
                </div>
            </nav>
        </header>
    )
}
