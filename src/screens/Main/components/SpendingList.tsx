import { SpendingListItem } from "@/components/SpendingListItem";
import { VirtualList } from "@/components/VirtualList";
import { useSpendingsStore } from "@/stores";
import { FC } from "react";
import { shallow } from "zustand/shallow";

export type SpendingListProps = {};

const estimateSize = () => 76;

export const SpendingList: FC<SpendingListProps> = () => {
  const { spendings, isLoading } = useSpendingsStore(
    (store) => ({ spendings: store.items, isLoading: store.isLoading }),
    shallow,
  );

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <VirtualList count={spendings.length} estimateSize={estimateSize}>
      {(virtualRow) => {
        const spending = spendings.at(virtualRow.index);
        return spending != null ? (
          <SpendingListItem key={spending.id} spending={spending} position={virtualRow.start} />
        ) : null;
      }}
    </VirtualList>
  );
};
