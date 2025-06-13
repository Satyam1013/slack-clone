import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCurrentUser } from "@/features/auth/api/use-current-user";

export function usePresence() {
  const { data } = useCurrentUser();
  const updatePresence = useMutation(api.presence.updatePresence);

  useEffect(() => {
    if (!data) return;

    let interval: NodeJS.Timeout | null = null;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && navigator.onLine) {
        updatePresence({ userId: data._id });
        interval = setInterval(() => {
          updatePresence({ userId: data._id });
        }, 15000);
      } else if (interval) {
        clearInterval(interval);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    handleVisibilityChange();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (interval) clearInterval(interval);
    };
  }, [updatePresence, data]);
}
