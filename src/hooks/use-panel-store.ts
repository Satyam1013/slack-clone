import { create } from "zustand";

interface PanelStore {
  parentMessageId: string | null;
  profileMemberId: string | null;
  setParentMessageId: (id: string | null) => void;
  setProfileMemberId: (id: string | null) => void;
  reset: () => void;
}

export const usePanelStore = create<PanelStore>((set) => ({
  parentMessageId: null,
  profileMemberId: null,
  setParentMessageId: (id) => set({ parentMessageId: id }),
  setProfileMemberId: (id) => set({ profileMemberId: id }),
  reset: () => set({ parentMessageId: null, profileMemberId: null }),
}));
