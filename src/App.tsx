import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

function App() {
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
