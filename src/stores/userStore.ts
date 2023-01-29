import { User } from "parse/dist/parse.min.js";
import { create } from "zustand";

type UserStore = {
  currentUser: User | null;
  // TODO: set async parse store. consder to use inbrowser sqlite
  init(): Promise<void>;
  login(username: string, password: string): Promise<void>;
  register(username: string, password: string, email: string): Promise<void>;
  logout(): Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  async init() {
    const currentUser = await User.currentAsync();
    set({ currentUser });
  },
  async login(username: string, password: string) {
    const user = await User.logIn(username, password);
    set({ currentUser: user });
  },
  async logout() {
    await User.logOut();
    set({ currentUser: null });
  },
  async register(username: string, password: string, email: string) {
    const user = new User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    await user.signUp();

    set({ currentUser: user });
  },
}));
