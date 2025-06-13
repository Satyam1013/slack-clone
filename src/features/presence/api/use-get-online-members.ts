import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useOnlineUsers = () => {
  const data = useQuery(api.presence.getOnlineUsers, {
    thresholdMs: 10000,
  });

  return {
    onlineUserIds: data ?? [],
    isLoading: data === undefined,
  };
};
