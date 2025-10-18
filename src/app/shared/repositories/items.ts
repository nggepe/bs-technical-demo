import data from "../data/items.json";
import type { Item } from "../types/items";

export interface FindManyItemsProps {
  limit?: number;
  offset?: number;
  search?: string;
  sort?: string;
  category?: string;
  favorite?: "all" | "favorite" | "non-favorite";
}

/**this function is just a fake response to simulate a real API call */
export const findManyItems = async ({
  limit = 10,
  offset = 0,
  search = "",
  sort = "id,asc",
  category = "",
  favorite = "all",
}: FindManyItemsProps): Promise<Item[]> => {
  //simulate loading
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const items = getItemsWithFavorite();
  const normalizedSearch = search.toLowerCase();

  const [sortField, sortOrder] = sort.split(",");

  return items
    .filter((item) => filter(item))
    .sort((a, b) => {
      const aValue = a[sortField as keyof Item];
      const bValue = b[sortField as keyof Item];

      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortOrder === "asc" ? 1 : -1;
      if (bValue === undefined) return sortOrder === "asc" ? -1 : 1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === "asc" ? comparison : -comparison;
      }

      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      return 0;
    })
    .slice(offset, offset + limit);

  function filter(item: Item): boolean {
    const searchFilter = item.name.toLowerCase().includes(normalizedSearch);
    const categoryFilter = category ? item.category === category : true;
    let favoriteFilter = true;
    if (favorite === "favorite") {
      favoriteFilter = item.favorite === true;
    } else if (favorite === "non-favorite") {
      favoriteFilter = !item.favorite;
    }
    return searchFilter && categoryFilter && favoriteFilter;
  }
};

const getItemsWithFavorite = () => {
  const items = data.items as Item[];
  const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
  return items.map((item) => ({
    ...item,
    favorite: favoriteIds.includes(item.id),
  }));
};

export const setFavoriteItem = (id: number, favorite: boolean) => {
  const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favorite) {
    favoriteIds.push(id);
  } else {
    favoriteIds.splice(favoriteIds.indexOf(id), 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favoriteIds));
};

export const findCategories = () => {
  const items = data.items as Item[];
  return Array.from(new Set(items.map((item) => item.category)));
};
