import { useQuery } from "convex/react";

import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface useGetWorkspaceProps {
  id: Id<"workspaces">;
}

export const useGetWorkspace = (props?: useGetWorkspaceProps) => {
  const id = props?.id;

  const data = useQuery(api.workspaces.getById, id ? { id } : "skip");
  const isLoading = data === undefined;

  return { data, isLoading };
};
