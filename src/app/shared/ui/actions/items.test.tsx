import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, type Mock } from "vitest";
import { ItemActions } from "./items";
import { useSearchParams } from "react-router";

const setSearchParams = vi.fn();
const searchParams = new URLSearchParams();

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const mockDebounce = vi.fn((fn) => fn);

vi.mock("use-debounce", () => ({
  useDebouncedCallback: () => mockDebounce,
}));

describe("ItemActions", () => {
  const mockUseSearchParams = useSearchParams as unknown as Mock<
    typeof useSearchParams
  >;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSearchParams.mockReturnValue([searchParams, setSearchParams]);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <ItemActions />
      </MemoryRouter>
    );
  };

  it("should render the component", () => {
    renderComponent();
    expect(screen.getByLabelText("favorite filter")).toBeInTheDocument();
    expect(screen.getByLabelText("category filter")).toBeInTheDocument();
  });

  it("should handle favorite filter change", () => {
    renderComponent();
    const favoriteFilter = screen.getByLabelText(
      "favorite filter"
    ) as HTMLSelectElement;
    fireEvent.change(favoriteFilter, { target: { value: "favorite" } });
    expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    expect(setSearchParams.mock.calls[0][0].get("favorite")).toBe("favorite");
  });

  it("should handle category filter change", () => {
    renderComponent();
    const categoryFilter = screen.getByLabelText(
      "category filter"
    ) as HTMLSelectElement;
    fireEvent.change(categoryFilter, { target: { value: "Home" } });
    expect(setSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    const updatedParams = setSearchParams.mock.calls[0][0];
    expect(updatedParams.get("category")).toBe("Home");
  });

  it("should debounce search input change", async () => {
    renderComponent();
    const searchInput = screen.getByLabelText(
      "search items"
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockDebounce).toHaveBeenCalled();
  });
});
