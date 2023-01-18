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

declare module "virtual:i18next-loader" {
  // eslint-disable-next-line
  const resources: any;
  export default resources;
}
