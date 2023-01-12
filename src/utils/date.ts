const intl = new Intl.DateTimeFormat(navigator.language, {
  month: "long",
});

const intl2 = new Intl.DateTimeFormat(navigator.language, {
  month: "short",
  day: "numeric",
  year: "2-digit",
});

export function formatMonthYear(date: Date): string {
  return `${intl.format(date)} ${date.getFullYear()}`;
}

export function formatDayMonthYear(date: Date): string {
  return intl2.format(date);
}
