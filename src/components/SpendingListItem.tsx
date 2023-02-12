import { Spending } from "@/models/Spending";
import { formatDayMonthYear } from "@/utils/date";
import { t } from "@/utils/translation";
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { FC, MouseEventHandler } from "react";
import { MemoizedCategoryIcon } from "./CategoryIcon";
import { FontAwesome } from "./FontAwesomeIcons";
import { Solid } from "./icon";
import { Money } from "./Money";

export type SpendingListItemProps = {
  spending: Spending;
  position?: number;
  height?: number;
  onEdit?: MouseEventHandler<HTMLIonItemOptionElement>;
  onDelete?: MouseEventHandler<HTMLIonItemOptionElement>;
};

export const SpendingListItem: FC<SpendingListItemProps> = ({
  spending,
  position,
  height,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      style={
        position != null
          ? {
              transform: `translateY(${position}px)`,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height,
            }
          : undefined
      }
    >
      <IonItemSliding>
        <IonItem className="theme simple">
          <div slot="start" className="py-2">
            <MemoizedCategoryIcon categoryId={spending.get("category").id} />
          </div>
          <IonLabel>
            <h2>{spending.get("category").get("name")}</h2>
            <p>{spending.get("comment")}</p>
          </IonLabel>
          <div className="flex flex-col items-end" slot="end">
            <Money amount={spending.get("amount")} className="text-xs" />
            <div>{formatDayMonthYear(spending.get("date"))}</div>
          </div>
        </IonItem>

        <IonItemOptions>
          <IonItemOption color="warning" onClick={onEdit}>
            <span slot="top">
              <Solid name={FontAwesome.pencil} />
            </span>
            {t("edit")}
          </IonItemOption>
          <IonItemOption color="danger" onClick={onDelete}>
            <span slot="top">
              <Solid name={FontAwesome.trash} />
            </span>
            {t("delete")}
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </div>
  );
};
