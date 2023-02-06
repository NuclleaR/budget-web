import { Money } from "@/components/Money";
import { PersonalSpending } from "@/models/PersonalSpending";
import { FC } from "react";

type PersonalSpendingItemProps = {
  spending: PersonalSpending;
};

export const PersonalSpendingItem: FC<PersonalSpendingItemProps> = ({ spending }) => {
  return (
    <div className="flex justify-between px-4 py-2">
      <div>{spending.get("comment")}</div>
      <Money amount={spending.get("amount")} currency={spending.get("currency")} />
    </div>
  );
};
