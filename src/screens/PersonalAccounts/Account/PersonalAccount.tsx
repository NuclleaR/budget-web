import { unicodeMap } from "@/components/FontAwesomeIcons";
import { ListLoader } from "@/components/ListLoader";
import { Money } from "@/components/Money";
import { Navbar } from "@/components/Navbar";
import { VirtualList } from "@/components/VirtualList";
import { usePersonalAccountStore } from "@/stores/personalAccountsStore";
import { usePersonalSpendingsStore } from "@/stores/personalSpendingsStore";
import { useToastStore } from "@/stores/toastStore";
import { Currency } from "@/utils/currency";
import { useParams } from "@tanstack/react-router";
import Parse from "parse/dist/parse.min.js";
import { FC, memo, useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { AddPersonalSpending } from "./components/AddPersonalSpending";
import { PersonalSpendingItem } from "./components/PersonalSpendingItem";

function estimateSize() {
  return 40;
}

export const PersonalAccount: FC = () => {
  const { id } = useParams();
  const setToast = useToastStore((state) => state.setToast);
  const [showAdd, setShowAdd] = useState(false);

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
        if (sub != null) {
          subscription = sub;
        }
      });
    }

    return () => {
      subscription?.unsubscribe();
      subscription = undefined;
    };
  }, [account?.id]);

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
    <>
      <Navbar
        title={account.get("name")}
        hasBack
        trailing={
          <button
            className="Solid absolute top-4 right-4 bottom-4 px-2"
            onClick={() => setShowAdd(true)}
            type="button"
          >
            {unicodeMap["circlePlus"]}
          </button>
        }
      />
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
            <VirtualList count={items.length} estimateSize={estimateSize}>
              {(virtualRow) => {
                const ps = items.at(virtualRow.index);
                return ps != null ? <PersonalSpendingItem key={ps.id} spending={ps} /> : null;
              }}
            </VirtualList>
          )}
        </div>
      </div>
      <AddPersonalSpending visible={showAdd} setVisible={setShowAdd} account={account} />
    </>
  );
};

export default memo(PersonalAccount);
