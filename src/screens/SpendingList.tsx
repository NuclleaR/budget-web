import { SpendingListItem } from "@/components/SpendingListItem";
import { useSpendingsStore } from "@/stores";
import { FC } from "react";
import shallow from "zustand/shallow";

export type SpendingListProps = {
  className?: string;
};

export const SpendingList: FC<SpendingListProps> = ({ className }) => {
  const { spendings, isLoading } = useSpendingsStore(
    (store) => ({ spendings: store.items, isLoading: store.isLoading }),
    shallow,
  );

  console.log(spendings, isLoading);

  return (
    <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-slate-200 px-4 pt-2 dark:bg-stone-800">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        spendings
          .slice(0, 10)
          .map((spending) => <SpendingListItem key={spending.id} spending={spending} />)
      )}
    </div>
  );
};
