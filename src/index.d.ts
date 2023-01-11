type Tab = "0" | "1";

declare namespace JSX {
  interface IntrinsicElements {
    button: React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<React.HTMLButtonElement> & {
        "data-button"?: Tab | undefined;
      },
      HTMLButtonElement
    >;
  }
}
