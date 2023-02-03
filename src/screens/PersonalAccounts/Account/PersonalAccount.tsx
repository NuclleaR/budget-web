import { usePersonalAccountStore } from "@/stores/personalAccountsStore";
import { useParams } from "@tanstack/react-router";
import { FC } from "react";

export const PersonalAccount: FC = () => {
  const { id } = useParams();

  const account = usePersonalAccountStore((state) => state.items.find((u) => u.id === id));

  console.log(account);

  if (account == null) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1>Account not found</h1>
      </div>
    );
  }

  return <div>Hello there {account.get("name")}</div>;
};
