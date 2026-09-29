import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
//import { Dashboard } from "./components/Dashboard/Dashboard";
import { Login } from "./components/Login/Login";
//import { Example1 } from "./components/Example1/Example1";
// import { Example2 } from "./components/Example2/Example2";
// import { Example3 } from "./components/Example3/Example3";
// import { Example4 } from "./components/Example4/Example4";
import { AppShell } from "./components/AppShell/AppShell";
// import { Controller } from "./components/Example3/components/Controller/Controller";
// import { PhysicalDisks } from "./components/Example3/components/Controller/PhysicalDisks";
// import { Enclosures } from "./components/Example3/components/Controller/Enclosures";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() =>
  import("./components/Dashboard/Dashboard").then((m) => ({
    default: m.Dashboard,
  })),
);
const Example1 = lazy(() =>
  import("./components/Example1/Example1").then((m) => ({
    default: m.Example1,
  })),
);
const Example2 = lazy(() =>
  import("./components/Example2/Example2").then((m) => ({
    default: m.Example2,
  })),
);
const Example3 = lazy(() =>
  import("./components/Example3/Example3").then((m) => ({
    default: m.Example3,
  })),
);
const Example4 = lazy(() =>
  import("./components/Example4/Example4").then((m) => ({
    default: m.Example4,
  })),
);
const Controller = lazy(() =>
  import("./components/Example3/components/Controller/Controller").then(
    (m) => ({
      default: m.Controller,
    }),
  ),
);
const PhysicalDisks = lazy(() =>
  import("./components/Example3/components/Controller/PhysicalDisks").then(
    (m) => ({
      default: m.PhysicalDisks,
    }),
  ),
);
const Enclosures = lazy(() =>
  import("./components/Example3/components/Controller/Enclosures").then(
    (m) => ({ default: m.Enclosures }),
  ),
);

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
        children: [
          { index: true, element: <Navigate to="controller" replace /> },
          { path: "controller", element: <Controller /> },
          { path: "physical-disks", element: <PhysicalDisks /> },
          { path: "enclosures", element: <Enclosures /> },
        ],
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
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
