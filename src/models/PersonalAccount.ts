import { CurrencyType } from "@/utils/currency";
import { Object } from "parse/dist/parse.min.js";

export type PersonalAccountAttributes = {
  name: string;
  image: string;
  amount: number;
  amountUsd: number;
  amountEur: number;
  currency: CurrencyType;
};

export class PersonalAccount extends Object<PersonalAccountAttributes> {
  constructor(attributes?: Partial<PersonalAccountAttributes>) {
    super("PersonalAccount", attributes as PersonalAccountAttributes);
  }
}

Object.registerSubclass("PersonalAccount", PersonalAccount);
