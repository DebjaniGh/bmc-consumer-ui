import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Login } from "./Login";

// Login navigates via react-router on success, so it needs a real router
// context and a /dashboard route to land on -- a stub is enough since only
// the navigation itself is under test here, not the dashboard's contents.
function renderLogin() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("Login", () => {
  it("navigates to the dashboard on valid username/password/domain", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText("Username"), "user123");
    await user.type(screen.getByLabelText("Password"), "xyz123");
    await user.selectOptions(screen.getByLabelText("Domain"), "bmc_ui");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByText("Dashboard Page")).toBeInTheDocument();
  });

  it("does not navigate on invalid credentials", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText("Username"), "wrong-user");
    await user.type(screen.getByLabelText("Password"), "wrong-pass");
    await user.selectOptions(screen.getByLabelText("Domain"), "bmc_ui");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(screen.queryByText("Dashboard Page")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("switches to the RSA passcode screen when the RSA domain is chosen", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText("Username"), "user123");
    await user.type(screen.getByLabelText("Password"), "xyz123");
    await user.selectOptions(screen.getByLabelText("Domain"), "rsa");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    // getByLabelText normalizes whitespace, so the label's trailing space
    // ("RSA Passcode: ") is trimmed before matching.
    expect(await screen.findByLabelText("RSA Passcode:")).toBeInTheDocument();
  });
});
