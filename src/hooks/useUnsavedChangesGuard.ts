import { useBlocker } from "react-router-dom";
import { useEffect } from "react";

/**
 * Intercepts in-app navigation away from the current route while `isDirty`
 * is true, so a caller can show a confirmation modal instead of silently
 * losing edits. Requires a data router (createBrowserRouter/RouterProvider)
 * -- useBlocker is a no-op under the plain <BrowserRouter> component.
 *
 * blocker.state cycles: "unblocked" -> "blocked" (navigation attempted,
 * paused) -> back to "unblocked" once the caller resolves it via
 * blocker.proceed() (continue navigating) or blocker.reset() (stay put).
 */
export function useUnsavedChangesGuard(isDirty: boolean) {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  // useBlocker only covers in-app navigation. Tab close/refresh/external
  // navigation bypass the router entirely, so they need the native
  // beforeunload prompt as a separate guard.
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (isDirty) event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  return blocker;
}
