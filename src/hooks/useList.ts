import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

export const useList = <T extends Element>(
  count: number,
  estimateSize: (index: number) => number,
  overscan: number = 5,
) => {
  const listRef = useRef<T>(null);

  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => listRef.current,
    estimateSize,
    overscan,
  });

  return { listRef, virtualizer };
};
