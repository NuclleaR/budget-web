import { Money } from "@/components/Money";
import { PersonalSpending } from "@/models/PersonalSpending";
import { FC } from "react";

type PersonalSpendingItemProps = {
  spending: PersonalSpending;
  position?: number;
  size?: number;
};

export const PersonalSpendingItem: FC<PersonalSpendingItemProps> = ({
  spending,
  size,
  position,
}) => {
  return (
    <div
      className="inset-0 flex justify-between px-4 py-2"
      style={
        position != null
          ? {
              transform: `translateY(${position}px)`,
              position: "absolute",
              height: size ?? "auto",
            }
          : undefined
      }
    >
      <div>{spending.get("comment")}</div>
      <Money amount={spending.get("amount")} currency={spending.get("currency")} />
    </div>
  );
};
