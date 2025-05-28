import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { LogOut, User } from "lucide-react";
import { signOut } from "@/lib/auth_client.ts";
import { useNavigate } from "@tanstack/react-router";

export function ProfileDropdown({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
    role: string;
  };
}) {
  const userNameArr = user.name.split(" ");
  const username = userNameArr[0][0] + userNameArr[1][0];
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={"mx-2 hover:cursor-pointer focus:outline-none"}
      >
        <Avatar>
          <AvatarImage src={user.image ?? ""} alt="profile pic" />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"md:mt-2 mb-2"}>
        <DropdownMenuLabel className={"text-center text-muted-foreground"}>
          Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: "/profile" })}>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
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
          <LogOut /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
