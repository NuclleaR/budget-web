import { FontAwesome } from "@/components/FontAwesomeIcons";
import { Solid } from "@/components/icon";
import { Money } from "@/components/Money";
import { Budget } from "@/models/Budget";
import { formatMonthYear } from "@/utils/date";
import { t } from "@/utils/translation";
import {
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  useIonActionSheet,
} from "@ionic/react";
import { FC, useRef } from "react";

export type BudgetActiionCalback = (budget: Budget) => void;

export type BudgetListItemProps = {
  budget: Budget;
  position?: number;
  size?: number;
  onEdit?: BudgetActiionCalback;
  onDelete?: BudgetActiionCalback;
};

export const BudgetListItem: FC<BudgetListItemProps> = ({
  budget,
  position,
  size,
  onDelete,
  onEdit,
}) => {
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const [present] = useIonActionSheet();

  const handleEdit =
    onEdit != null
      ? () => {
          onEdit(budget);
          slidingRef.current?.close();
        }
      : undefined;

  const handleDelete = () => {
    present({
      header: t("deleteBudget") + "?",
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
      onDidDismiss: (data) => {
        if (data.detail.role === "destructive") {
          onDelete?.(budget);
        }
      },
    });
  };

  return (
    <div
      className="inset-0"
      style={
        position != null
          ? {
              transform: `translateY(${position}px)`,
              position: "absolute",
              height: size ?? "auto",
            }
          : undefined
      }
    >
      <IonItemSliding ref={slidingRef}>
        <IonItem className="theme simple budget-item">
          <IonLabel>
            <p>{t("budgetFor")}</p>
            <h1>{formatMonthYear(budget.get("date"))}</h1>
          </IonLabel>
          <div className="flex flex-col items-end justify-between gap-2" slot="end">
            <Money amount={budget.get("amount")} currency={budget.get("currency")} />
            <Money
              className="text-xs"
              amount={budget.get("available")}
              currency={budget.get("currency")}
            />
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
