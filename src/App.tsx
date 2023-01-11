import { BottomNavBar } from "./components/BottomNavBar";
import { Main } from "./screens/Main";

function App() {
  // const items = useBudgetsStore((state) => state.items);
  // const isLoading = useBudgetsStore((state) => state.isLoading);

  // const categories = useCategoriesStore((state) => state.items);

  // if (isLoading) {
  //   return <div className="">Loading...</div>;
  // }

  // console.log("items", items[0]);

  // console.log("categories", categories[0]);

  // console.log("color", Color.fromInt(categories[0]?.get("color")));

  return (
    <div>
      <Main />
      <BottomNavBar />
    </div>
  );
}

export default App;
