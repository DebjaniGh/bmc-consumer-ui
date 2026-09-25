# consumer-ui

A demo application that consumes **[`@debjani6ghosh/bmc-ui-kit`](https://www.npmjs.com/package/@debjani6ghosh/bmc-ui-kit)**, a published, standalone React component library, to rebuild the login and dashboard experience of BMC admin console.

This project exists to prove the library works the way a real consuming app would use it — installed as a package, not copy-pasted as source — and to exercise every tier of the kit (primitives, patterns, and full-page templates) against realistic, data-driven screens.

## What it demonstrates

- **Three login variants from one library** — standard username/password, RSA SecurID passcode, and Smart Card PIN — all built from the ui-kit's `LoginPage`, `RSALoginPage`, and `SmartCardLoginPage` templates, switched at runtime based on the selected domain.
- **A routed application shell** — `AppShell` composes the kit's `AppLayout`, `Sidebar`, and `IconButton` with `react-router-dom`, so navigation, active-link highlighting, and sidebar collapse are all driven by real routes.
- **A live dashboard** — `Card`, `StatusIndicator`, and `DropdownButton` render server health tiles, system info, and power/LED controls from the kit, styled entirely by the library's design tokens.
- **Server state, not mock state** — `Example2` wires the kit's `Form`, `TextField`, and `InfoField` to a real fetch/patch cycle via TanStack Query, including optimistic cache updates and a dirty-field diff before submitting.
- **A generic data grid at scale** — `Example1` feeds 100+ rows through the kit's `DataGrid`, exercising its column sorting and client-side pagination.
- **URL-driven sub-navigation** — `Example3` nests `RoutingTabs` under a parent route, with each tab backed by its own child route and `Outlet`.

## Tech stack

- React 19 + TypeScript
- Vite
- React Router v7
- TanStack Query
- [`@debjani6ghosh/bmc-ui-kit`](https://www.npmjs.com/package/@debjani6ghosh/bmc-ui-kit) — the component library this app consumes

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. The app starts on the login screen; sign in with the demo credentials wired up in `src/components/Login/Login.tsx` to reach the dashboard and example routes.

Other scripts:

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint       # run ESLint
```

## Project structure

```
src/
  App.tsx                 # route table
  components/
    Login/                # LoginPage / RSALoginPage / SmartCardLoginPage demo
    AppShell/              # AppLayout + Sidebar + routed navigation
    Dashboard/              # Card, StatusIndicator, DropdownButton demo
    Example1/               # DataGrid at scale
    Example2/                # Form + TanStack Query + optimistic updates
    Example3/                 # RoutingTabs with nested routes
    Example4/                  # placeholder route
```

## About the library

`@debjani6ghosh/bmc-ui-kit` is a separately versioned and published npm package — design tokens, primitives (`Button`, `TextField`, `SelectField`, `IconButton`, `DropdownButton`), patterns (`Card`, `StatusIndicator`, `InfoField`, `DataGrid`, `Tabs`, `RoutingTabs`), and full-page templates (`LoginPage`, `RSALoginPage`, `SmartCardLoginPage`, `AppLayout`). This app links against it during development via npm's `file:` protocol against a sibling `ui-kit/` folder, and against the published registry version for real installs.
