import { SpendingListItem } from "@/components/SpendingListItem";
import { useSpendingsStore } from "@/stores";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FC, useRef } from "react";
import { shallow } from "zustand/shallow";

export type SpendingListProps = {};

export const SpendingList: FC<SpendingListProps> = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const { spendings, isLoading } = useSpendingsStore(
    (store) => ({ spendings: store.items, isLoading: store.isLoading }),
    shallow,
  );

  const rowVirtualizer = useVirtualizer({
    count: spendings?.length ?? 0,
    getScrollElement: () => listRef.current,
    estimateSize: () => 76,
    overscan: 5,
  });

  return isLoading ? (
    <div className="py-10 text-center">Loading...</div>
  ) : (
    <div className="overflow-y-auto" ref={listRef}>
      <div
        className="w-full, relative"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const spending = spendings.at(virtualRow.index);
          return spending != null ? (
            <SpendingListItem key={spending.id} spending={spending} position={virtualRow.start} />
          ) : null;
        })}
      </div>
    </div>
  );
};
