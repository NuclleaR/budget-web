import { FC } from "react";
import { unicodeMap } from "../FontAwesomeIcons";

type IconProps = {
  name: keyof typeof unicodeMap;
  className?: string;
};

export const Solid: FC<IconProps> = ({ name, className }) => {
  return <span className={`Solid ${className}`}>{unicodeMap[name]}</span>;
};

export const Regular: FC<IconProps> = ({ name, className }) => {
  return <span className={`Regular ${className}`}>{unicodeMap[name]}</span>;
};

export const Brands: FC<IconProps> = ({ name, className }) => {
  return <span className={`Brands ${className}`}>{unicodeMap[name]}</span>;
};
