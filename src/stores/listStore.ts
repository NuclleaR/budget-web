import Parse from "parse/dist/parse.min.js";
import { Mutate, StoreApi } from "zustand";
import { useUserStore } from "./userStore";

export interface ListState<T extends Parse.Object<Parse.Attributes>> {
  items: T[];
  isLoading: boolean;
  isLive: boolean;
  error: Error | Parse.Error | null;
  query: Parse.Query<T> | null | undefined;
  fetchItems: (enableLiveQuery?: boolean) => Promise<void>;
  setQuery: (query: Parse.Query<T>) => void;
  handleCreate: (object: T) => void;
  handleUpdate: (object: T) => void;
  handleDelete: (object: T) => void;
}

export function listSlice<T extends Parse.Object<Parse.Attributes>>(
  set: Mutate<StoreApi<ListState<T>>, []>["setState"],
  get: Mutate<StoreApi<ListState<T>>, []>["getState"],
  query?: Parse.Query<T>,
): ListState<T> {
  return {
    items: [],
    isLoading: false,
    isLive: false,
    error: null,
    query: query,
    fetchItems: async (enableLiveQuery = true) => {
      const { query, isLive } = get();
      if (!query) {
        return;
      }
      set({ isLoading: true });
      try {
        const results = await query.find();
        set({ items: results });
      } catch (error) {
        if (
          error instanceof Parse.Error &&
          (error.code === Parse.Error.INVALID_SESSION_TOKEN ||
            error.code === Parse.Error.SESSION_MISSING ||
            error.code === Parse.Error.INVALID_LINKED_SESSION)
        ) {
          useUserStore.getState().logout();
        }
        set({ error: error as Error | Parse.Error });
      } finally {
        set({ isLoading: false });
      }
      if (enableLiveQuery && !isLive) {
        const subscription = await query.subscribe();

        subscription.on("open", () => {
          console.log("open");
          set({ isLive: true });
        });
        subscription.on("close", () => {
          set({ isLive: false });
        });

        subscription.on("create", (object) => get().handleCreate(object as T));
        subscription.on("update", (object) => get().handleUpdate(object as T));
        subscription.on("delete", (object) => get().handleDelete(object as T));
      }
    },
    setQuery: (query) => {
      set({ query });
    },
    handleCreate: (object) => {
      console.log("create", object);
      set((state) => ({ items: [object, ...state.items] }));
    },
    handleUpdate: (object) => {
      console.log("update", object);
      set((state) => ({
        items: state.items.map((item) => item.id === object.id ? object : item),
      }));
    },
    handleDelete: (object) => {
      console.log("delete", object);
      set((state) => ({
        items: state.items.filter((item) => item.id !== object.id),
      }));
    },
  };
}
