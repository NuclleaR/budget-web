import { FC, PropsWithChildren } from "react";
import { unicodeMap } from "./FontAwesomeIcons";

export type ListHeaderProps = {
  onAdd?: () => void;
};

export const ListHeader: FC<PropsWithChildren<ListHeaderProps>> = ({ children, onAdd }) => {
  return (
    <div className="relative py-4">
      <h1 className="text-center text-2xl font-semibold">{children}</h1>
      {onAdd && (
        <button
          className="Solid absolute top-4 right-4 bottom-4 px-2"
          onClick={onAdd}
          type="button"
        >
          {unicodeMap["circlePlus"]}
        </button>
      )}
    </div>
  );
};
