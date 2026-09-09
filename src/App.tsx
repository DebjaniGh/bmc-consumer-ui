import { BrowserRouter, useRoutes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";

const routeConfig = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
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
