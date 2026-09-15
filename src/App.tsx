import { BrowserRouter, useRoutes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";
import { Example1 } from "./components/Example1/Example1";
import { Example2 } from "./components/Example2/Example2";
import { Example3 } from "./components/Example3/Example3";
import { Example4 } from "./components/Example4/Example4";
import { AppShell } from "./components/AppShell/AppShell";

const routeConfig = [
  {
    path: "/",
    element: <Login />,
  },
  /**A route object with children but no path (just element) is called a layout route —
   * it renders <AppShell /> for any of its children's URLs, */
  {
    element: <AppShell />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Example1",
        element: <Example1 />,
      },
      {
        path: "/Example2",
        element: <Example2 />,
      },
      {
        path: "/Example3",
        element: <Example3 />,
      },
      {
        path: "/Example4",
        element: <Example4 />,
      },
    ],
  },
];

function AppRoutes() {
  return useRoutes(routeConfig);
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
