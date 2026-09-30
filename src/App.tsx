import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { AppShell } from "./components/AppShell/AppShell";
import { lazy, Suspense, type ReactNode } from "react";

/* lazy() only accepts a promise that resolves to a default export, so named exports have to
 be manually reshaped into that form. */
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

// Each lazy route element needs its own Suspense boundary: with a data
// router, RouterProvider renders the matched tree directly (it takes no
// children to wrap in a single top-level Suspense the way useRoutes did).
function withSuspense(element: ReactNode) {
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
}

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
        element: withSuspense(<Dashboard />),
      },
      {
        path: "/Example1",
        element: withSuspense(<Example1 />),
      },
      {
        path: "/Example2",
        element: withSuspense(<Example2 />),
      },
      {
        path: "/Example3",
        element: withSuspense(<Example3 />),
        children: [
          { index: true, element: <Navigate to="controller" replace /> },
          { path: "controller", element: withSuspense(<Controller />) },
          { path: "physical-disks", element: withSuspense(<PhysicalDisks />) },
          { path: "enclosures", element: withSuspense(<Enclosures />) },
        ],
      },
      {
        path: "/Example4",
        element: withSuspense(<Example4 />),
      },
    ],
  },
];

// createBrowserRouter (a "data router") is required rather than
// <BrowserRouter> + useRoutes: only data routers support useBlocker, which
// the unsaved-changes guard on Example2 depends on to intercept navigation.
const router = createBrowserRouter(routeConfig);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
