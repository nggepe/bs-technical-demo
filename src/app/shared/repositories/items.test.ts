import { describe, it, expect } from "vitest";
import { findManyItems } from "./items";

describe("items repository", () => {
  it("should return 10 items if no options are provided", async () => {
    const items = await findManyItems({});
    expect(items.length).toBe(10);
  });

  it("should return the correct number of items when limit is provided", async () => {
    const items = await findManyItems({ limit: 5 });
    expect(items.length).toBe(5);
  });

  it("should return the correct items when offset is provided", async () => {
    const allItems = await findManyItems({ limit: 20 });
    const items = await findManyItems({ offset: 5, limit: 20 });
    expect(items[0].id).toBe(allItems[5].id);
  });

  it("should return the correct items when search is provided", async () => {
    const items = await findManyItems({ search: "Lamp", limit: 20 });
    expect(items.length).toBe(2);
  });

  it("should return the items sorted by name in ascending order", async () => {
    const items = await findManyItems({ sort: "name,asc", limit: 20 });
    expect(items[0].name).toBe("Alpine Jacket");
    expect(items[14].name).toBe("Velvet Throw");
  });

  it("should return the items sorted by name in descending order", async () => {
    const items = await findManyItems({ sort: "name,desc", limit: 20 });
    expect(items[0].name).toBe("Velvet Throw");
    expect(items[14].name).toBe("Alpine Jacket");
  });

  it("should return the correct items when all options are provided", async () => {
    const items = await findManyItems({
      limit: 1,
      offset: 1,
      search: "a",
      sort: "name,asc",
    });
    expect(items.length).toBe(1);
    expect(items[0].name).toBe("Aurora Lamp");
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it("should return the items sorted by price in ascending order", async () => {
    const items = await findManyItems({ sort: "price,asc", limit: 20 });
    expect(items[0].price).toBe(12.0);
    expect(items[14].price).toBe(199.0);
  });

  it("should return the items sorted by price in descending order", async () => {
    const items = await findManyItems({ sort: "price,desc", limit: 20 });
    expect(items[0].price).toBe(199.0);
    expect(items[14].price).toBe(12.0);
  });

  it("should return the correct items when category is provided", async () => {
    const items = await findManyItems({ category: "Home", limit: 20 });
    expect(items.length).toBe(4);
    items.forEach((item) => {
      expect(item.category).toBe("Home");
    });
  });

  it("should return only favorite items", async () => {
    localStorage.setItem("favorites", JSON.stringify([1, 3]));
    const items = await findManyItems({ favorite: "favorite", limit: 20 });
    expect(items.length).toBe(2);
    expect(items[0].id).toBe(1);
    expect(items[1].id).toBe(3);
  });

  it("should return only non-favorite items", async () => {
    localStorage.setItem("favorites", JSON.stringify([1, 2, 3, 4, 5]));
    const items = await findManyItems({ favorite: "non-favorite", limit: 20 });
    expect(items.length).toBe(10);
    items.forEach((item) => {
      expect(item.favorite).toBe(false);
    });
  });

  it("should not change order when sorting by non-existent property", async () => {
    const items = await findManyItems({ limit: 5 });
    const sortedItems = await findManyItems({
      sort: "nonExistent,asc",
      limit: 5,
    });
    expect(sortedItems).toEqual(items);
  });
});