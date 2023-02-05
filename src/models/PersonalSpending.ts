import { CurrencyType } from "@/utils/currency";
import { Object } from "parse/dist/parse.min.js";
import { PersonalAccount } from "./PersonalAccount";

export type PersonalSpendingAttributes = {
  comment: string;
  account: PersonalAccount;
  amount: number;
  currency: CurrencyType;
};

export class PersonalSpending extends Object<PersonalSpendingAttributes> {
  constructor(attributes?: Partial<PersonalSpendingAttributes>) {
    super("PersonalAccount", attributes as PersonalSpendingAttributes);
  }
}

Object.registerSubclass("PersonalSpending", PersonalSpending);
