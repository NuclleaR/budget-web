import { FC, ReactNode } from "react";

export type BottomNavBarProps = {
  children: ReactNode;
};

export const BottomNavBar: FC<BottomNavBarProps> = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t-2 border-gray-500 bg-slate-200 dark:bg-zinc-800">
      <div className="flex justify-evenly py-2">{children}</div>
    </div>
  );
};
