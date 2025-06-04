import {Computer, Moon, Sun} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useTheme} from "@/components/theme-provider";

export function ModeToggle() {
    const {setTheme, theme} = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={"rounded-full"}>
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className={"text-center text-muted-foreground"}>
                    Theme
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => setTheme("light")} className={`${theme === "light" && "bg-accent"}`}>
                    <Sun/> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className={`${theme === "dark" && "bg-accent"}`}>
                    <Moon/> Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className={`${theme === "system" && "bg-accent"}`}>
                    <Computer/> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
