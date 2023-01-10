import { useEffect } from "react";
import { useBudgetStore } from "./stores/budgets";

function App() {
  const items = useBudgetStore((state) => state.items);
  const isLoading = useBudgetStore((state) => state.isLoading);

  const fetchBudgets = useBudgetStore((state) => state.fetchBudgets);

  useEffect(() => {
    fetchBudgets();
  }, [fetchBudgets]);

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  return <div className="">{items.length}</div>;
}

export default App;
