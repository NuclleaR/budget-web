import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./AuthContext";
import { router } from "./router";

// import { BottomNavBar } from "./components/BottomNavBar";
// import { Main } from "./screens/Main";

function App() {
  // return <RouterProvider router={router} />;

  return (
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <Main />
      <BottomNavBar /> */}
    </AuthProvider>
  );
}

export default App;

// declare module "@tanstack/react-router" {
//   interface RegisterRouter {
//     router: typeof router;
//   }
// }
