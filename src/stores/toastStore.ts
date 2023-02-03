import { create } from "zustand";

type ToastStore = {
  toast: string;
  setToast(message: string): void;
};

let timeout: number;

export const useToastStore = create<ToastStore>((set) => ({
  toast: "",
  setToast: (message) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (message) {
      timeout = window.setTimeout(() => {
        set({ toast: "" });
      }, 3000);
      set({ toast: message });
    } else {
      set({ toast: "" });
    }
  },
}));
