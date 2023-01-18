import { FormInput } from "@/components/form/FormInput";
import { t } from "@/utils/translation";
import { FC, useState } from "react";
import { SlideModal } from "../../components/SlideModal";

export type AddSpendingProps = {};

export const AddSpending: FC<AddSpendingProps> = () => {
  const [visible, setVisible] = useState(false);

  const addSpendingTitile = t("addSpending");

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
          setVisible(false);
        }}
      >
        <form className="flex flex-col">
          <FormInput label={t("amount")} />
        </form>
      </SlideModal>
    </>
  );
};
