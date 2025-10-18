import { render, screen } from "@testing-library/react";
import App from "./App";
import { expect, test } from "vitest";
import { MemoryRouter } from "react-router";

test("renders headline", () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headline = screen.getByText(/Find and choose your favorite products/i);
  expect(headline).toBeInTheDocument();
});
