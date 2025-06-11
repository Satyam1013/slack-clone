import { usePanelStore } from "./use-panel-store";

export const usePanel = () => {
  const {
    parentMessageId,
    profileMemberId,
    setParentMessageId,
    setProfileMemberId,
    reset,
  } = usePanelStore();

  const onOpenProfile = (id: string) => {
    setProfileMemberId(id);
    setParentMessageId(null);
  };

  const onOpenMessage = (id: string) => {
    setParentMessageId(id);
    setProfileMemberId(null);
  };

  const onClose = () => {
    reset();
  };

  return {
    parentMessageId,
    profileMemberId,
    onOpenMessage,
    onOpenProfile,
    onClose,
  };
};
