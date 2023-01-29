import { User } from "parse/dist/parse.min.js";
import { create } from "zustand";

type UserStore = {
  currentUser: User | null;
  login(): void;
  logout(): void;
};

const userStore = create<UserStore>((set, get) => ({
  currentUser: null,
  login(username: string, password: string) {
    // set({ currentUser: User.current() });
  },
  logout() {
    set({ currentUser: null });
  },
}));
