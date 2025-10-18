import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { Pagination } from "./Pagination";
import { MemoryRouter, useSearchParams } from "react-router";

const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe("Pagination", () => {
  const mockUseSearchParams = useSearchParams as unknown as Mock<
    typeof useSearchParams
  >;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSearchParams.mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  it("should render the current page number", () => {
    render(
      <MemoryRouter>
        <Pagination length={10} />
      </MemoryRouter>
    );
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("disables the previous button on the first page", () => {
    render(
      <MemoryRouter>
        <Pagination length={10} />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });
    expect(prevButton).toBeDisabled();
  });

  it("disables the next button when there are no more items", () => {
    render(
      <MemoryRouter>
        <Pagination length={5} />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", { name: "Go to next page" });
    expect(nextButton).toBeDisabled();
  });

  it("calls setSearchParams with the correct offset on next click", () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("offset=0&limit=10"),
      mockSetSearchParams,
    ]);

    render(
      <MemoryRouter>
        <Pagination length={10} />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", { name: "Go to next page" });
    fireEvent.click(nextButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      offset: "10",
      limit: "10",
    });
  });

  it("calls setSearchParams with the correct offset on prev click", () => {
    mockUseSearchParams.mockReturnValue([
      new URLSearchParams("offset=10&limit=10"),
      mockSetSearchParams,
    ]);

    render(
      <MemoryRouter>
        <Pagination length={10} />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole("button", {
      name: "Go to previous page",
    });
    fireEvent.click(prevButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      offset: "0",
      limit: "10",
    });
  });
});
