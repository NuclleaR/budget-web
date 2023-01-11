const intl = new Intl.DateTimeFormat(navigator.language, {
  month: "long",
});

export function format(date: Date): string {
  return `${intl.format(date)} ${date.getFullYear()}`;
}
