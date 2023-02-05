import { Route } from "@tanstack/react-router";
import { layoutRoute, navbarLayoutRoute } from "..";
import PersonalAccount from "./Account/PersonalAccount";
import PersonalAccounts from "./PersonalAccouts";

export const personalAccountsRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "/accounts",
  component: PersonalAccounts,
});

export const personalAccountRoute = new Route({
  getParentRoute: () => navbarLayoutRoute,
  path: "/account/$id",
  component: PersonalAccount,
});
