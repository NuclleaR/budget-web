import { useBudgetStore } from "./stores";

function App() {
  const items = useBudgetStore((state) => state.items);
  const isLoading = useBudgetStore((state) => state.isLoading);

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  return <pre className="">{JSON.stringify(items, null, 2)}</pre>;
}

export default App;
