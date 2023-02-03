import { PersonalAccount } from "@/models/PersonalAccount";
import { create } from "zustand";
import { listSlice, ListState } from "./listStore";

export const usePersonalAccount = create<ListState<PersonalAccount>>((
  set,
  get,
) => ({
  ...listSlice(
    set,
    get,
    new Parse.Query(PersonalAccount),
  ),
}));
