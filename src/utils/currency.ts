export const Currency = {
  UAH: 0,
  USD: 1,
  EUR: 2,
} as const;

export type CurrencyType = typeof Currency[keyof typeof Currency];

export const currencies = new Map<CurrencyType, string>(
  [[Currency.UAH, "₴"], [Currency.USD, "$"], [Currency.EUR, "€"]],
);

export function formatCurrency(amount: number, currency?: CurrencyType): {
  value: string;
  friction: string;
  currencySign: string;
} {
  const [value, friction] = amount.toFixed(2).split(".");

  return {
    value,
    friction,
    currencySign: (currency && currencies.get(currency)) || "₴",
  };
}
