import { Spending } from "@/models/Spending";
import { formatDayMonthYear } from "@/utils/date";
import { FC } from "react";
import { Money } from "./Money";

export type SpendingListItemProps = {
  spending: Spending;
};

export const SpendingListItem: FC<SpendingListItemProps> = ({ spending }) => {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div>{spending.get("category").get("name")}</div>
      </div>
      <div className="flex flex-col">
        <Money amount={spending.get("amount")} className="text-xs" />
        <div>{formatDayMonthYear(spending.get("date"))}</div>
      </div>
    </div>
  );
};
