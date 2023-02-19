import { Spending } from "@/models/Spending";
import { formatDayMonthYear } from "@/utils/date";
import { t } from "@/utils/translation";
import {
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  useIonActionSheet,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { FC, MouseEvent, useRef } from "react";
import { MemoizedCategoryIcon } from "./CategoryIcon";
import { FontAwesome } from "./FontAwesomeIcons";
import { Solid } from "./icon";
import { Money } from "./Money";

export type SpendingActionHandler = (
  spending: Spending,
  event: MouseEvent<HTMLIonItemOptionElement>,
) => void;

export type SpendingListItemProps = {
  spending: Spending;
  position?: number;
  height?: number;
  onEdit?: SpendingActionHandler;
  onDelete?: SpendingActionHandler;
};

type ActonType = {
  action: "cancel" | "delete";
  item?: Spending;
};

export const SpendingListItem: FC<SpendingListItemProps> = ({
  spending,
  position,
  height,
  onDelete,
  onEdit,
}) => {
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const [present] = useIonActionSheet();

  const handleEdit =
    onEdit != null
      ? (event: MouseEvent<HTMLIonItemOptionElement>) => {
          onEdit(spending, event);
          slidingRef.current?.close();
        }
      : undefined;

  const handleDelete = (event: MouseEvent<HTMLIonItemOptionElement>) => {
    present({
      header: t("deleteSpending") + "?",
      subHeader: t("dataWillBeLost"),
      buttons: [
        {
          text: t("delete"),
          role: "destructive",
        },
        {
          text: t("cancel"),
          role: "cancel",
        },
      ],
      onWillPresent: () => {
        slidingRef.current?.close();
      },
      onDidDismiss: (data: CustomEvent<OverlayEventDetail<ActonType>>) => {
        if (data.detail.role === "destructive") {
          onDelete?.(spending, event);
        }
      },
    });
  };

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
      <IonItemSliding ref={slidingRef}>
        <IonItem className="theme simple">
          <div slot="start" className="py-2">
            <MemoizedCategoryIcon categoryId={spending.get("category").id} />
          </div>
          <IonLabel>
            <h2>{spending.get("category").get("name")}</h2>
            <p>{spending.get("comment")}</p>
          </IonLabel>
          <div className="flex flex-col items-end" slot="end">
            <Money
              amount={spending.get("amount")}
              className="text-xs"
              currency={spending.get("currency")}
            />
            <div>{formatDayMonthYear(spending.get("date"))}</div>
          </div>
        </IonItem>

        <IonItemOptions>
          <IonItemOption color="warning" onClick={handleEdit}>
            <span slot="top">
              <Solid name={FontAwesome.pencil} />
            </span>
            {t("edit")}
          </IonItemOption>
          <IonItemOption color="danger" onClick={handleDelete}>
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
