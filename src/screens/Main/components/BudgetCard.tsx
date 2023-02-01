import { useBudgetsStore } from "@/stores";
import { cn } from "@/utils/classNames";
import { formatMonthYear } from "@/utils/date";
import { FC } from "react";
import { Money } from "../../../components/Money";

export type CardProps = {
  className?: string;
  onRefresh: () => void;
};

export const BudgetCard: FC<CardProps> = ({ onRefresh, className }) => {
  const budget = useBudgetsStore((state) => state.currentBudget);
  const isLoading = useBudgetsStore((state) => state.isLoading);

  return (
    <div
      className={cn(
        "flex h-28 flex-col justify-between rounded-xl bg-black p-4 text-neutral-200",
        className,
      )}
    >
      {budget != null ? (
        <>
          <div className="flex justify-between text-2xl capitalize">
            {formatMonthYear(budget.get("date"))}
            <button type="button" className="-mt-2 -mr-2 p-2" title="refresh" onClick={onRefresh}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.54636 19.7673C10.9455 20.8316 13.803 20.7738 16.2499 19.361C20.3154 17.0138 21.7084 11.8153 19.3612 7.74983L19.1112 7.31682M4.63826 16.25C2.29105 12.1845 3.68399 6.98595 7.74948 4.63874C10.1965 3.22597 13.0539 3.16816 15.4531 4.23253M2.49316 16.3336L5.22521 17.0657L5.95727 14.3336M18.0424 9.66565L18.7744 6.9336L21.5065 7.66565"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-between">
            <Money amount={budget.get("available")} currency={budget.get("currency")} />
            <Money amount={budget.get("amount")} currency={budget.get("currency")} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          {isLoading ? "Loading" : "No budget"}
        </div>
      )}
    </div>
  );
};
