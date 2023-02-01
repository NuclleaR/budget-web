export function cn(
  ...className: (
    | string
    | number
    | null
    | undefined
    | false
    | (string | number)[]
    | Record<string, boolean>
  )[]
): string {
  return className
    .filter(Boolean)
    .map((c) => {
      switch (typeof c) {
        case "string":
        case "number":
          return c;
        case "object":
          if (c == null) {
            return "";
          }
          if (Array.isArray(c)) {
            return cn(...c);
          }
          return Object.entries(c).reduce((prevVal, [klass, isOk]) => {
            return isOk ? `${prevVal} ${klass}` : prevVal;
          }, "");
      }
    })
    .join(" ");
}
