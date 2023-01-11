import { Card } from "@/components/Card";
import { useBudgetsStore } from "@/stores";
import { FC } from "react";

function voidFn() {}

export const Main: FC = () => {
  const items = useBudgetsStore((state) => state.items);
  const isLoading = useBudgetsStore((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 pt-4">
      <Card budget={items[0]} onRefresh={voidFn} className="mx-4" />
    </div>
  );
};
