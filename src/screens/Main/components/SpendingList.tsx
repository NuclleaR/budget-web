import { ListLoader } from "@/components/ListLoader";
import { SpendingActionHandler, SpendingListItem } from "@/components/SpendingListItem";
import { VirtualList } from "@/components/VirtualList";
import { useSpendingsStore } from "@/stores";
import { useToastStore } from "@/stores/toastStore";
import { t } from "@/utils/translation";
import { FC, useCallback } from "react";
import { shallow } from "zustand/shallow";

export type SpendingListProps = {
  onEdit?: SpendingActionHandler;
};

const estimateSize = () => 70;

export const SpendingList: FC<SpendingListProps> = ({ onEdit }) => {
  const setToast = useToastStore((state) => state.setToast);

  const { spendings, isLoading } = useSpendingsStore(
    (store) => ({ spendings: store.items, isLoading: store.isLoading }),
    shallow,
  );

  const handleDelete = useCallback<SpendingActionHandler>(async (spending) => {
    try {
      await spending.destroy();
      setToast(t("spendingDeleted"));
    } catch (error) {
      console.error("Error while deleting Spending: ", error);
      setToast(t("errorMessage"));
    }
  }, []);

  return isLoading ? (
    <ListLoader />
  ) : (
    <VirtualList count={spendings.length} estimateSize={estimateSize}>
      {(virtualRow) => {
        const spending = spendings.at(virtualRow.index);

        return spending != null ? (
          <SpendingListItem
            key={spending.id}
            spending={spending}
            position={virtualRow.start}
            height={virtualRow.size}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ) : null;
      }}
    </VirtualList>
  );
};
