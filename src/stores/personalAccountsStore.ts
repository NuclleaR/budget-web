import { PersonalAccount } from "@/models/PersonalAccount";
import Parse from "parse/dist/parse.min.js";
import { create } from "zustand";
import { listSlice, ListState } from "./listStore";

export const usePersonalAccountStore = create<ListState<PersonalAccount>>((
  set,
  get,
) => ({
  ...listSlice(
    set,
    get,
    new Parse.Query(PersonalAccount),
  ),
}));
