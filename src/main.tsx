import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

/** useQuery needs a QueryClient somewhere above it in the tree to
 * store its cache. This goes once at the app root, not per-component: */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reference/inventory data (controllers, enclosures, ...) rarely
      // changes -- skip the automatic background refetch on every remount.
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
