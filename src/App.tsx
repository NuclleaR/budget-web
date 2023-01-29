import { RouterProvider } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { router } from "./router";
import { Component404 } from "./screens/404";
import { useUserStore } from "./stores/userStore";

function App() {
  const [isInitUser, setIsInitUser] = useState(false);
  const init = useUserStore((state) => state.init);

  useEffect(() => {
    init().then(() => {
      setIsInitUser(true);
    });
  }, []);

  return isInitUser ? (
    <RouterProvider router={router} defaultLoaderMaxAge={5000} defaultComponent={Component404} />
  ) : (
    <div>Loading...</div>
  );
}

export default App;
