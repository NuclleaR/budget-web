import { FontAwesome } from "@/components/FontAwesomeIcons";
import { Solid } from "@/components/icon";
import { Money } from "@/components/Money";
import { PersonalAccount } from "@/models/PersonalAccount";
import { Link } from "@tanstack/react-router";
import { FC, MouseEventHandler } from "react";

export type AccountItemProps = {
  account: PersonalAccount;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export const AccountListItem: FC<AccountItemProps> = ({ account, onClick }) => {
  return (
    <Link
      to="/account/$id"
      params={{
        id: account.id,
      }}
      className="flex px-4 py-4"
      onClick={onClick}
      data-title={account.get("name")}
    >
      <div className="mr-2 flex flex-1 items-center justify-between">
        <div>{account.get("name")}</div>
        <Money amount={account.get("amount")} currency={account.get("currency")} />
      </div>
      <Solid className="opacity-30" name={FontAwesome.chevronRight} />
    </Link>
  );
};
