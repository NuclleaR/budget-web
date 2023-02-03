import { FormInput } from "@/components/form/FormInput";
import { Select } from "@/components/form/Select";
import { useModalVisible } from "@/hooks/useModalVisible";
import { Category } from "@/models/Category";
import { Spending } from "@/models/Spending";
import { useCategoriesStore } from "@/stores";
import { useToastStore } from "@/stores/toastStore";
import { t } from "@/utils/translation";
import { validateEntity } from "@/utils/validators";
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { SlideModal } from "../../../components/SlideModal";
import { CategoryListItem } from "./CategoryListItem";
// import Parse from "parse/dist/parse.min.js";

export type AddSpendingProps = {};

const addSpendingTitile = t("addSpending");

export const AddSpending: FC<AddSpendingProps> = () => {
  const categories = useCategoriesStore((state) => state.items);
  const setToast = useToastStore((state) => state.setToast);

  const spending = useRef(new Spending());

  const [visible, setVisible] = useState(false);
  const {
    afterLeave,
    localVisible,
    setLocalVisible,
    isLoading,
    okEnabled,
    setLoading,
    setOkEnabled,
  } = useModalVisible(visible, setVisible);

  const inputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "amount":
        if (value === "") {
          spending.current.set("amount", 0);
          break;
        }
        spending.current.set("amount", parseFloat(value));
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
    validateEntity(spending.current, setOkEnabled);
  }, []);

  const categoryHandler = useCallback<(item: Category | null) => void>((item) => {
    if (item != null) {
      spending.current.set("category", item);
    } else {
      spending.current.unset("category");
    }
    validateEntity(spending.current, setOkEnabled);
  }, []);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      await spending.current.save();
      setLocalVisible(false);
      spending.current = new Spending();
      setToast(t("spendingAdded"));
    } catch (error) {
      setToast((error as Error).message);
    }
  }, [spending]);

  return (
    <>
      <button
        onClick={() => {
          setVisible(true);
        }}
        type="button"
      >
        {addSpendingTitile}
      </button>
      {visible && (
        <SlideModal
          title={addSpendingTitile}
          visible={localVisible}
          okEnabled={okEnabled}
          onClose={setLocalVisible}
          onOk={handleSave}
          isLoading={isLoading}
          afterLeave={afterLeave}
        >
          <div className="flex flex-col divide-y divide-gray-500/30">
            <FormInput
              name="amount"
              label={t("amount")}
              type="number"
              placeholder={t("inputAmount")}
              onChange={inputHandler}
              className="text-right"
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
              onChange={inputHandler}
              className="text-right"
            />
          </div>
        </SlideModal>
      )}
    </>
  );
};

function renderSelectBox(selected: Category | null) {
  return selected != null ? <CategoryListItem item={selected} /> : <div>{t("selectCategory")}</div>;
}
