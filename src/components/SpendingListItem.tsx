import { Spending } from "@/models/Spending";
import { formatDayMonthYear } from "@/utils/date";
import { FC } from "react";
import { Money } from "./Money";

export type SpendingListItemProps = {
  spending: Spending;
  position?: number;
};

export const SpendingListItem: FC<SpendingListItemProps> = ({ spending, position }) => {
  return (
    <div
      className="flex justify-between border-t-2 border-gray-500 p-4"
      style={
        position != null
          ? {
              transform: `translateY(${position}px)`,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "76px",
            }
          : undefined
      }
    >
      <div className="flex">
        <div>{spending.get("category").get("name")}</div>
      </div>
      <div className="flex flex-col items-end">
        <Money amount={spending.get("amount")} className="text-xs" />
        <div>{formatDayMonthYear(spending.get("date"))}</div>
      </div>
    </div>
  );
};
