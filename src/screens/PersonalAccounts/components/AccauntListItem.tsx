import { PersonalAccount } from "@/models/PersonalAccount";
import { Link } from "@tanstack/react-router";
import { FC } from "react";

export type AccountItemProps = {
  account: PersonalAccount;
};

export const AccountListItem: FC<AccountItemProps> = ({ account }) => {
  return (
    <Link
      to="/account/$id"
      params={{
        id: account.id,
      }}
      className="flex items-center justify-between px-4 py-4"
    >
      <div>{account.get("name")}</div>
    </Link>
  );
};
