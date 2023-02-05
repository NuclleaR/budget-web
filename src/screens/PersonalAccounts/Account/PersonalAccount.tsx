import { ListLoader } from "@/components/ListLoader";
import { Money } from "@/components/Money";
import { VirtualList } from "@/components/VirtualList";
import { usePersonalAccountStore } from "@/stores/personalAccountsStore";
import { usePersonalSpendingsStore } from "@/stores/personalSpendingsStore";
import { useToastStore } from "@/stores/toastStore";
import { Currency } from "@/utils/currency";
import { useParams } from "@tanstack/react-router";
import Parse from "parse/dist/parse.min.js";
import { FC, memo, useEffect } from "react";
import { shallow } from "zustand/shallow";

export const PersonalAccount: FC = () => {
  const { id } = useParams();
  const setToast = useToastStore((state) => state.setToast);

  const account = usePersonalAccountStore((state) => state.items.find((u) => u.id === id));

  const { fetchItems, isLoading, error, items } = usePersonalSpendingsStore(
    (state) => ({
      fetchItems: state.fetchItemsForAccount,
      isLoading: state.isLoading,
      error: state.error,
      items: state.items,
    }),
    shallow,
  );

  useEffect(() => {
    if (error != null) {
      setToast(error.message);
    }
  }, [error]);

  useEffect(() => {
    let subscription: Parse.LiveQuerySubscription | undefined;
    if (account != null) {
      fetchItems(account).then((sub) => {
        subscription = sub;
      });
    }

    return () => {
      subscription?.unsubscribe();
      console.log("unsubscribe", subscription);
    };
  }, [account?.id]);

  console.log(isLoading, error, items);

  if (account == null) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1>Account not found</h1>
      </div>
    );
  }

  const amountUsd = account.get("amountUsd");
  const amountEur = account.get("amountEur");

  return (
    <div className="flex h-page flex-col">
      <div className="p-4">
        <Money amount={account.get("amount")} currency={account.get("currency")} />
        {amountUsd != null && <Money amount={amountUsd} currency={Currency.USD} />}
        {amountEur != null && <Money amount={amountEur} currency={Currency.EUR} />}
      </div>
      <div className="flex-1">
        {isLoading ? (
          <ListLoader />
        ) : (
          <VirtualList count={items.length} estimateSize={() => 56}>
            {(virtualRow) => {
              const ps = items.at(virtualRow.index);
              return ps != null ? <div key={ps.id}>{ps.get("comment")}</div> : null;
            }}
          </VirtualList>
        )}
      </div>
    </div>
  );
};

export default memo(PersonalAccount);
