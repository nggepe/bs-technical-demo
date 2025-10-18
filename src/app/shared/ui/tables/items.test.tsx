import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { ItemTable } from "./items";
import { MemoryRouter } from "react-router-dom";
import { useSearchParams } from "react-router";
import * as itemRepo from "../../repositories/items";
import type { Item } from "../../types/items";

const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const mockItems: Item[] = [
  {
    id: 1,
    name: "Item 1",
    category: "Category A",
    price: 100,
    favorite: false,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Item 2",
    category: "Category B",
    price: 200,
    favorite: true,
    rating: 4.5,
  },
];

describe("ItemTable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchParams as Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  it("renders items correctly", () => {
    render(
      <MemoryRouter>
        <ItemTable items={mockItems} loading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Category A")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();

    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Category B")).toBeInTheDocument();
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(
      <MemoryRouter>
        <ItemTable items={[]} loading={true} />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles sorting when headers are clicked", () => {
    render(
      <MemoryRouter>
        <ItemTable items={mockItems} loading={false} />
      </MemoryRouter>
    );

    const nameHeader = screen.getByText("Item Name");
    fireEvent.click(nameHeader);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it("handles favoriting an item", () => {
    const setFavoriteItemSpy = vi.spyOn(itemRepo, "setFavoriteItem");

    render(
      <MemoryRouter>
        <ItemTable items={mockItems} loading={false} />
      </MemoryRouter>
    );

    const favoriteButtons = screen.getAllByText("♡");
    fireEvent.click(favoriteButtons[0]);

    expect(setFavoriteItemSpy).toHaveBeenCalledWith(1, true);
  });
});
