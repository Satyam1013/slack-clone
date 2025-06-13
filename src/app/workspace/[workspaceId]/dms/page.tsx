"use client";

import { useMemberId } from "@/hooks/use-member-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { DMUserItem } from "../user-dm-item";

export default function DMsPage() {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();

  const { data: members } = useGetMembers({ workspaceId });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Direct Messages</h2>

      <div className="space-y-1">
        {members?.map((item) => (
          <DMUserItem
            key={item._id}
            id={item._id}
            name={item.user.name}
            image={item.user.image}
            isActive={item._id === memberId}
          />
        ))}
      </div>
    </div>
  );
}
