import { FC, useState } from "react";
import { SlideModal } from "../../components/SlideModal";

export type AddSpendingProps = {};

export const AddSpending: FC<AddSpendingProps> = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setVisible(true);
        }}
      >
        Add spending
      </button>
      <SlideModal
        title="Add spending"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        <label>
          <span>Amount</span>
          <input type="number" />
        </label>
      </SlideModal>
    </>
  );
};
