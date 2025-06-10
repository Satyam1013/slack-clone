import { Doc, Id } from "../../convex/_generated/dataModel";

interface ReactionProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionProps) => {
    return (
        <div>REE</div>
    )
};