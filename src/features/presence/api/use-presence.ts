import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCurrentUser } from "@/features/auth/api/use-current-user";
import { useEffect } from "react";

export function usePresence() {
  const { data } = useCurrentUser();
  const updatePresence = useMutation(api.presence.updatePresence);

  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      updatePresence({ userId: data._id });
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [updatePresence, data]);
}
