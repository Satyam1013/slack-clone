import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import { useCurrentUser } from "../api/use-current-user";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!data) return null;

  const { image, name } = data;
  const avatarFallback = name?.charAt(0).toUpperCase();

  return (
    <div className="relative z-50">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none">
          <Avatar className="rounded-md size-10 hover:opacity-75 transition">
            <AvatarImage className="rounded-md" alt={name} src={image} />
            <AvatarFallback className="rounded-md bg-sky-400 text-white">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right" className="w-60 z-50">
          <DropdownMenuItem onClick={() => signOut()} className="h-10">
            <LogOut className="size-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
