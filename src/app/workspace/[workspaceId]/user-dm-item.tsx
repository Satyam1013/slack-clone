"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

interface DMUserItemProps {
  id: Id<"members">;
  name?: string;
  image?: string;
  isActive?: boolean;
}

export const DMUserItem = ({ id, name, image, isActive }: DMUserItemProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const fallback = name?.[0]?.toUpperCase() ?? "?";

  return (
    <div
      onClick={() => router.push(`/workspace/${workspaceId}/member/${id}`)}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors hover:bg-muted",
        isActive && "bg-muted font-medium"
      )}
    >
      <Avatar className="h-7 w-7">
        <AvatarImage src={image} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <span className="truncate text-sm">{name}</span>
    </div>
  );
};
