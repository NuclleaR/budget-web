import { PersonalAccount } from "@/models/PersonalAccount";
import { PersonalSpending } from "@/models/PersonalSpending";
import Parse from "parse/dist/parse.min.js";
import { create } from "zustand";
import { listSlice, ListState } from "./listStore";

interface PersonalSpendingsStore extends ListState<PersonalSpending> {
  fetchItemsForAccount(
    account: PersonalAccount,
  ): ReturnType<ListState<PersonalSpending>["fetchItems"]>;
}

export const usePersonalSpendingsStore = create<PersonalSpendingsStore>((
  set,
  get,
) => {
  const slice = listSlice(
    set,
    get,
  );

  return {
    ...slice,
    async fetchItemsForAccount(account) {
      console.log("fetchItemsForAccount");
      const query = new Parse.Query(PersonalSpending).equalTo(
        "account",
        account,
      );
      slice.setQuery(query);
      return slice.fetchItems();
    },
  };
});
