import { Category } from "@/models/Category";
import { useCategoriesStore } from "@/stores";
import { cn } from "@/utils/classNames";
import { Color } from "@/utils/color";
import { FC, memo } from "react";
import { unicodeMap } from "./FontAwesomeIcons";

export type CategoryIconProps = {
  categoryId: Category["id"];
  className?: string;
};

export const CategoryIcon: FC<CategoryIconProps> = ({ categoryId, className }) => {
  const category = useCategoriesStore((state) => state.items.find((c) => c.id === categoryId));

  if (!category) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg",
        category.get("iconFont"),
        className,
      )}
      style={{
        background: Color.fromInt(category.get("color"), 0.1),
      }}
    >
      <span
        style={{
          color: Color.fromInt(category.get("color")),
        }}
      >
        {unicodeMap[category.get("iconName")]}
      </span>
    </div>
  );
};

export const MemoizedCategoryIcon = memo(CategoryIcon);
