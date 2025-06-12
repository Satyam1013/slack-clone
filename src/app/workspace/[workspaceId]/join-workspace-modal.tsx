/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useJoin } from "@/features/workspaces/api/use-join";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VerificationInput from "react-verification-input";
import { cn } from "@/lib/utils";

interface JoinWorkspaceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const JoinWorkspaceModal = ({
  open,
  setOpen,
}: JoinWorkspaceModalProps) => {
  const { mutate, isPending } = useJoin();
  const router = useRouter();

  const handleComplete = (code: string) => {
    if (!code || code.length !== 6) {
      toast.error("Invalid code");
      return;
    }

    mutate(
      { joinCode: code },
      {
        onSuccess: (workspaceId) => {
          toast.success("Workspace joined!");
          router.replace(`/workspace/${workspaceId}`);
          setOpen(false);
        },
        onError: (err) => {
          toast.error(
            "Failed to join workspace. You might already be a member."
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col items-center gap-4">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Join invite</DialogTitle>
          <p className="text-muted-foreground text-sm mt-1">
            Enter the workspace code to join
          </p>
        </DialogHeader>

        <VerificationInput
          onComplete={handleComplete}
          length={6}
          autoFocus
          placeholder="•"
          validChars="0-9a-zA-Z"
          classNames={{
            container: cn(
              "flex gap-x-2 mt-2",
              isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "w-10 h-12 text-xl font-medium text-center text-gray-800 border rounded-md border-gray-300 bg-muted outline-none",
            characterSelected:
              "border-black bg-white text-black ring-2 ring-black",
            characterFilled: "bg-gray-300 text-black",
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
