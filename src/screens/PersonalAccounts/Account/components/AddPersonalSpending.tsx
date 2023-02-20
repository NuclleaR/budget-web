import { FormInput } from "@/components/form/FormInput";
import { SlideModal } from "@/components/SlideModal";
import { useModalVisible } from "@/hooks/useModalVisible";
import { PersonalAccount } from "@/models/PersonalAccount";
import { PersonalSpending } from "@/models/PersonalSpending";
import { t } from "@/utils/translation";
import { ChangeEvent, FC, useRef } from "react";

type AddPersonalSpendingProps = {
  visible: boolean;
  setVisible(visible: boolean): void;
  account: PersonalAccount;
};

export const AddPersonalSpending: FC<AddPersonalSpendingProps> = ({
  visible,
  setVisible,
  account,
}) => {
  const {
    localVisible,
    afterLeave,
    setLocalVisible,
    okEnabled,
    setOkEnabled,
    isLoading,
    setLoading,
  } = useModalVisible(visible, setVisible);

  const personalSpending = useRef(
    new PersonalSpending({
      currency: account.get("currency"),
      account,
    }),
  );

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "amount":
        personalSpending.current.set("amount", parseFloat(event.target.value));
        break;
      case "comment":
        personalSpending.current.set("comment", event.target.value);
    }
    validate();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await personalSpending.current.save();
      setLoading(false);
      setLocalVisible(false);
      personalSpending.current = new PersonalSpending({
        currency: account.get("currency"),
        account,
      });
    } catch (error) {
      setToast((error as Error).message);
    }
  };

  function validate() {
    setOkEnabled(personalSpending.current.isValid());
  }

  return (
    <SlideModal
      title={t("addPersonalSpending")}
      visible={localVisible}
      okEnabled={okEnabled}
      onClose={setLocalVisible}
      onOk={handleSave}
      afterLeave={afterLeave}
      isLoading={isLoading}
    >
      <div className="flex flex-col">
        <FormInput name="amount" label={t("amount")} type="number" onChange={inputHandler} />
        <FormInput name="comment" label={t("comment")} type="text" onChange={inputHandler} />
      </div>
    </SlideModal>
  );
};
function setToast(message: string) {
  throw new Error("Function not implemented.");
}
