import { FormInput } from "@/components/form/FormInput";
import { Select } from "@/components/form/Select";
import { useCategoriesStore } from "@/stores";
import { t } from "@/utils/translation";
// import Parse from "parse/dist/parse.min.js";
import { FC, useRef, useState } from "react";
import { SlideModal } from "../../components/SlideModal";
import { CategoryListItem } from "./CategoryListItem";

export type AddSpendingProps = {};

const addSpendingTitile = t("addSpending");

export const AddSpending: FC<AddSpendingProps> = () => {
  const [visible, setVisible] = useState(false);
  const categories = useCategoriesStore((state) => state.items);
  // const spending = useRef(new Parse.Object("Spendings"));
  const formRef = useRef<HTMLFormElement | null>(null);

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
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          // setVisible(false);
          console.log(Object.fromEntries(new FormData(formRef.current as HTMLFormElement)));
        }}
      >
        <form className="flex flex-col" ref={formRef}>
          <FormInput
            name="amount"
            label={t("amount")}
            type="number"
            placeholder={t("inputAmount")}
          />
          <FormInput name="date" label={t("date")} type="date" />
          <Select
            label={t("category")}
            items={categories}
            renderFn={({ item, active, selected, disabled }) => {
              return <CategoryListItem item={item} />;
            }}
            onChange={(selected) => {}}
          >
            {(selected) => {
              return selected != null ? (
                <CategoryListItem item={selected} />
              ) : (
                <div>{t("selectCategory")}</div>
              );
            }}
          </Select>
          <FormInput
            name="comment"
            label={t("comment")}
            type="text"
            placeholder={t("inputComment")}
          />
        </form>
      </SlideModal>
    </>
  );
};
