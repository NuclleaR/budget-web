export type Currency = 0 | 1 | 2;

const currencies: Map<Currency, string> = new Map(
  [[0, "₴"], [1, "$"], [2, "€"]],
);

export function formatCurrency(amount: number, currency?: Currency): {
  value: string;
  friction: string;
  currencySign: string;
} {
  const [value, friction] = amount.toFixed(2).split(".");

  return {
    value,
    friction,
    currencySign: currency && currencies.get(currency) || "₴",
  };
}
