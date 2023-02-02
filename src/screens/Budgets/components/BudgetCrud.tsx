import { FormInput } from "@/components/form/FormInput";
import { Money } from "@/components/Money";
import { SlideModal } from "@/components/SlideModal";
import { useModalVisible } from "@/hooks/useModalVisible";
import { Budget } from "@/models/Budget";
import { useParentCategoriesStore } from "@/stores";
import { cn } from "@/utils/classNames";
import { currencies, Currency, CurrencyType } from "@/utils/currency";
import { t } from "@/utils/translation";
import { RadioGroup } from "@headlessui/react";
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { shallow } from "zustand/shallow";

export type BudgetCrudProps = {
  budget?: Budget;
  visible: boolean;
  setVisible(visible: boolean): void;
};

export const BudgetCrud: FC<BudgetCrudProps> = ({ budget: initBudget, visible, setVisible }) => {
  const { parentCategories, fetchItems } = useParentCategoriesStore(
    (state) => ({ parentCategories: state.items, fetchItems: state.fetchItems }),
    shallow,
  );
  const budget = useRef(initBudget ?? new Budget({ currency: Currency.UAH }));

  const {
    localVisible,
    afterLeave,
    setLocalVisible,
    okEnabled,
    setOkEnabled,
    isLoading,
    setLoading,
  } = useModalVisible(visible, setVisible);

  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState<CurrencyType>(Currency.UAH);

  useEffect(() => {
    if (parentCategories.length == 0) {
      fetchItems();
    }
  }, []);

  const inputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = event.target;
    switch (name) {
      case "amount":
        if (value === "") {
          budget.current.set("amount", 0);
          break;
        }
        budget.current.set("amount", parseInt(value, 10));
        break;
      case "date":
        console.log(new Date(value));
        budget.current.set("date", new Date(value));
        break;
      case "budgetPlan":
        const budgetPlan = {
          ...budget.current.get("budgetPlan"),
          [id]: value ? parseInt(value, 10) : 0,
        };
        budget.current.set("budgetPlan", budgetPlan);
        const total = getTotalAmount(budgetPlan);
        setTotal(total);
        budget.current.set("amount", total);
        break;
      default:
        break;
    }
    validate();
  }, []);

  function validate() {
    const isValid = budget.current.isValid();

    if (isValid != okEnabled) {
      setOkEnabled(isValid);
    }
  }

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      await budget.current.save();
      setLocalVisible(false);
      budget.current = new Budget({ currency: Currency.UAH });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <SlideModal
      title={t(initBudget == null ? "newBudget" : "editBudget")}
      visible={localVisible}
      okEnabled={okEnabled}
      onClose={setLocalVisible}
      onOk={handleSave}
      afterLeave={afterLeave}
    >
      <div className="flex flex-col">
        <FormInput name="date" label={t("date")} type="month" onChange={inputHandler} />
        <br />
        <div className="font-semibold">{t("expenseItems")}:</div>
        <div className="divide-y divide-gray-500/30">
          {parentCategories.map((parentCategory) => (
            <FormInput
              name="budgetPlan"
              key={parentCategory.id}
              id={parentCategory.id}
              label={parentCategory.get("name")}
              type="number"
              onChange={inputHandler}
              placeholder={t("inputAmount")}
            />
          ))}
        </div>
        <br />
        <div className="flex justify-between">
          <span>{t("totalAmount")}:</span>
          <Money amount={total} currency={currency} />
        </div>
        <br />
        <RadioGroup
          value={currency}
          onChange={(value) => {
            setCurrency(value);
            budget.current.set("currency", value);
          }}
        >
          <RadioGroup.Label className="mb-3 block font-semibold">{t("currency")}:</RadioGroup.Label>
          <div className="theme-text flex space-x-1 rounded-xl bg-gray-300 p-1 dark:bg-stone-700">
            {Object.values(Currency).map((val) => {
              return (
                <RadioGroup.Option
                  key={val}
                  as="button"
                  value={val}
                  className={({ checked }) =>
                    cn("w-full rounded-lg py-1.5", checked && "bg-gray-400 dark:bg-stone-500")
                  }
                >
                  <span className="inline-block aspect-square h-full rounded-full ring ring-stone-800 dark:ring-neutral-200">
                    {currencies.get(val)}
                  </span>
                </RadioGroup.Option>
              );
            })}
          </div>
        </RadioGroup>
      </div>
      <br />
    </SlideModal>
  );
};

function getTotalAmount(data: Record<string, number> = {}) {
  return Object.values(data).reduce((acc, cur) => acc + cur, 0);
}
