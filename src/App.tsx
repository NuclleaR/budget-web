import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

function App() {
  // const [defaultLoaderMaxAge, setDefaultLoaderMaxAge] = useSessionStorage(
  //   "defaultLoaderMaxAge",
  //   5000,
  // );

  return (
    <RouterProvider
      router={router}
      defaultLoaderMaxAge={5000}
      // Normally, the options above aren't changing, but for this particular
      // example, we need to key the router when they change
    />
  );
}

export default App;
