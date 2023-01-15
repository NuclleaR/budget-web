import { Mutate, StoreApi } from "zustand";

export interface ListState<T extends Parse.Object<Parse.Attributes>> {
  items: T[];
  isLoading: boolean;
  isLive: boolean;
  error: unknown; // TODO replace
  query: Parse.Query<T> | null | undefined;
  fetchItems: (enableLiveQuery?: boolean) => Promise<void>;
  setQuery: (query: Parse.Query<T>) => void;
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
        set({ error });
      } finally {
        set({ isLoading: false });
      }
      if (enableLiveQuery && !isLive) {
        const subscription = await query.subscribe();
        subscription.on("open", () => {
          set({ isLive: true });
        });
        subscription.on("close", () => {
          set({ isLive: false });
        });
        subscription.on("create", (object) => {
          set((state) => ({ items: [...state.items, object as T] }));
        });
        subscription.on("update", (object) => {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === object.id ? object as T : item
            ),
          }));
        });
        subscription.on("delete", (object) => {
          set((state) => ({
            items: state.items.filter((item) => item.id !== object.id),
          }));
        });
      }
    },
    setQuery: (query) => {
      set({ query });
    },
  };
}
