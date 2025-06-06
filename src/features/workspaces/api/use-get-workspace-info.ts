import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetWorkspaceInfoProps {
  id: Id<"workspaces">;
}

export const useGetWorkspaceInfo = (props?: useGetWorkspaceInfoProps) => {
  const id = props?.id;

  const data = useQuery(api.workspaces.getInfoById, id ? { id } : "skip");
  const isLoading = data === undefined;

  return { data, isLoading };
};
