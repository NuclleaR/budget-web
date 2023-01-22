import { MemoizedCategoryIcon } from "@/components/CategoryIcon";
import { Category } from "@/models/Category";
import { FC } from "react";

export type CategoryListItemProps = {
  item: Category;
};

export const CategoryListItem: FC<CategoryListItemProps> = ({ item }) => {
  const name = item.get("name");

  return (
    <div className="flex cursor-pointer items-center">
      <MemoizedCategoryIcon categoryId={item.id} className="mr-4" />
      <span>{name}</span>
    </div>
  );
};
