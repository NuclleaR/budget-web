import { ListHeader } from "@/components/ListHeader";
import { ListLoader } from "@/components/ListLoader";
import { useNavbar } from "@/stores/navbarStore";
import { usePersonalAccountStore } from "@/stores/personalAccountsStore";
import { t } from "@/utils/translation";
import { FC, memo, MouseEventHandler, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { AccountListItem } from "./components/AccauntListItem";

export const PersonalAccounts: FC = () => {
  const { accounts, isLoading } = usePersonalAccountStore(
    (store) => ({
      accounts: store.items,
      isLoading: store.isLoading,
      fetchItems: store.fetchItems,
    }),
    shallow,
  );

  const setTitle = useNavbar((state) => state.setTitle);

  const handleClick = useCallback<MouseEventHandler<HTMLAnchorElement>>((event) => {
    setTitle(event.currentTarget.dataset.title);
  }, []);

  return (
    <>
      <div className="flex h-full w-full flex-col bg-gradient-to-tr from-blue-500 to-teal-600">
        <ListHeader>{t("personalAccounts")}</ListHeader>
        <div className="h-full flex-1 overflow-hidden rounded-t-3xl bg-slate-200 pt-2 dark:bg-stone-800">
          {isLoading ? (
            <ListLoader />
          ) : (
            <div className="divide-y divide-gray-500/30">
              {accounts.map((account) => (
                <AccountListItem key={account.id} account={account} onClick={handleClick} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(PersonalAccounts);
