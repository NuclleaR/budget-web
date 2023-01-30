import { useList } from "@/hooks/useList";
import { VirtualItem } from "@tanstack/react-virtual";
import { FC } from "react";

export type VirtualListProps = {
  count: number;
  estimateSize: () => number;
  overscan?: number;
  children: (virtualRow: VirtualItem) => JSX.Element | null;
};

export const VirtualList: FC<VirtualListProps> = ({ count, estimateSize, overscan, children }) => {
  const { listRef, virtualizer } = useList<HTMLDivElement>(count, estimateSize, overscan);

  return (
    <div className="h-full overflow-y-auto" ref={listRef}>
      <div
        className="w-full, relative"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualizer.getVirtualItems().map(children)}
      </div>
    </div>
  );
};
