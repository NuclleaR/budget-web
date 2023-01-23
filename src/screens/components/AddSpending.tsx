import { FormInput } from "@/components/form/FormInput";
import { Select } from "@/components/form/Select";
import { Category } from "@/models/Category";
import { Spending } from "@/models/Spending";
import { useCategoriesStore } from "@/stores";
import { t } from "@/utils/translation";
// import Parse from "parse/dist/parse.min.js";
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { SlideModal } from "../../components/SlideModal";
import { CategoryListItem } from "./CategoryListItem";

export type AddSpendingProps = {};

const addSpendingTitile = t("addSpending");

export const AddSpending: FC<AddSpendingProps> = () => {
  const [visible, setVisible] = useState(false);
  const [okEnabled, setEnabled] = useState(false);
  const categories = useCategoriesStore((state) => state.items);
  const spending = useRef(new Spending());

  const inputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "amount":
        if (value === "") {
          spending.current.set("amount", 0);
          break;
        }
        spending.current.set("amount", parseInt(value, 10));
        break;
      case "date":
        spending.current.set("date", new Date(value));
        break;
      case "comment":
        spending.current.set("comment", value);
        break;
      default:
        break;
    }
    validate();
  }, []);

  const categoryHandler = useCallback<(item: Category | null) => void>((item) => {
    if (item != null) {
      spending.current.set("category", item);
    } else {
      spending.current.unset("category");
    }
    validate();
  }, []);

  function validate() {
    const isValid = spending.current.isValid();

    if (isValid != okEnabled) {
      setEnabled(isValid);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        {addSpendingTitile}
      </button>
      <SlideModal
        title={addSpendingTitile}
        visible={visible}
        okEnabled={okEnabled}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          if (spending.current.isValid()) {
            spending.current
              .save()
              .then(() => {
                setVisible(false);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }}
      >
        <div className="flex flex-col">
          <FormInput
            name="amount"
            label={t("amount")}
            type="number"
            placeholder={t("inputAmount")}
            onChange={inputHandler}
          />
          <FormInput name="date" label={t("date")} type="date" onChange={inputHandler} />
          <Select
            label={t("category")}
            items={categories}
            renderFn={({ item }) => {
              return <CategoryListItem item={item} />;
            }}
            onChange={categoryHandler}
          >
            {renderSelectBox}
          </Select>
          <FormInput
            name="comment"
            label={t("comment")}
            type="text"
            placeholder={t("inputComment")}
          />
        </div>
      </SlideModal>
    </>
  );
};

function renderSelectBox(selected: Category | null) {
  return selected != null ? <CategoryListItem item={selected} /> : <div>{t("selectCategory")}</div>;
}
