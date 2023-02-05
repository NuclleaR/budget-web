import { create } from "zustand";

type NavbarStore = {
  title: string;
  setTitle(title?: string): void;
  hasBack: boolean;
  setHasBack(hasBack: boolean): void;
};

export const useNavbar = create<NavbarStore>((set) => ({
  title: "",
  setTitle: (title) => set({ title: title || "" }),
  hasBack: true,
  setHasBack: (hasBack) => set({ hasBack }),
}));
