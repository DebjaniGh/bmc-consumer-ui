import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Example4 } from "./Example4";

describe("Example4", () => {
  it("renders its placeholder content", () => {
    render(<Example4 />);
    expect(screen.getByText("Hello from Example 4")).toBeInTheDocument();
  });
});
