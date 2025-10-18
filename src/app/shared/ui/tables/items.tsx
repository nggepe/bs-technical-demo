import { useMemo, useState, type FC } from "react";
import type { Item } from "../../types/items";
import { useSearchParams } from "react-router";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { setFavoriteItem } from "../../repositories/items";

interface ItemTableProps {
  items: Item[];
  loading: boolean;
}

export const ItemTable: FC<ItemTableProps> = ({ items, loading = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = useMemo(() => searchParams.get("sort"), [searchParams]);

  const handleSortParams = (field: keyof Item) => {
    const currentSort = searchParams.get("sort");
    if (!currentSort) {
      return searchParams.set("sort", `${field},asc`);
    }
    const [currentField, currentDirection] = currentSort.split(",");
    if (currentField === field) {
      if (currentDirection === "desc") {
        return searchParams.delete("sort");
      }
      return searchParams.set("sort", `${field},desc`);
    }
    return searchParams.set("sort", `${field},asc`);
  };

  function handleSort(field: keyof Item) {
    handleSortParams(field);
    setSearchParams(searchParams);
  }

  return (
    <table className="table-auto w-full border border-gray-300 border-collapse">
      <thead>
        <tr className="bg-blue-100">
          <th
            className="border border-gray-300 px-4 py-2 text-center cursor-pointer"
            onClick={() => handleSort("favorite")}
          >
            <div className="flex">
              <span>
                {currentSort === `favorite,asc` && (
                  <ArrowDownNarrowWide className="me-2" />
                )}
                {currentSort === `favorite,desc` && (
                  <ArrowUpNarrowWide className="me-2" />
                )}
              </span>
              <span>Favorite</span>
            </div>
          </th>
          <th
            className="border border-gray-300 px-4 py-2 text-start cursor-pointer"
            onClick={() => handleSort("name")}
          >
            <div className="flex">
              <span>
                {currentSort === `name,asc` && (
                  <ArrowDownNarrowWide className="me-2" />
                )}
                {currentSort === `name,desc` && (
                  <ArrowUpNarrowWide className="me-2" />
                )}
              </span>
              <span>Item Name</span>
            </div>
          </th>
          <th
            className="border border-gray-300 px-4 py-2 text-start cursor-pointer"
            onClick={() => handleSort("rating")}
          >
            <div className="flex">
              <span>
                {currentSort === `rating,asc` && (
                  <ArrowDownNarrowWide className="me-2" />
                )}
                {currentSort === `rating,desc` && (
                  <ArrowUpNarrowWide className="me-2" />
                )}
              </span>
              <span>Rating</span>
            </div>
          </th>
          <th
            className="border border-gray-300 px-4 py-2 text-start cursor-pointer"
            onClick={() => handleSort("category")}
          >
            <div className="flex">
              <span>
                {currentSort === `category,asc` && (
                  <ArrowDownNarrowWide className="me-2" />
                )}
                {currentSort === `category,desc` && (
                  <ArrowUpNarrowWide className="me-2" />
                )}
              </span>
              <span>Category</span>
            </div>
          </th>
          <th
            className="border border-gray-300 px-4 py-2 text-end cursor-pointer"
            onClick={() => handleSort("price")}
          >
            <div className="flex justify-between">
              <span>
                {currentSort === `price,asc` && (
                  <ArrowDownNarrowWide className="me-2" />
                )}
                {currentSort === `price,desc` && (
                  <ArrowUpNarrowWide className="me-2" />
                )}
              </span>
              <span>Price</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.length < 1 && !loading && (
          <tr>
            <td className="text-center py-6" colSpan={5}>
              Product is not found.
            </td>
          </tr>
        )}
        {!loading &&
          items.map((item) => <ItemsData key={item.id} data={item} />)}
        {loading && (
          <tr>
            <td className="text-center py-6" colSpan={5}>
              Loading...
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const ItemsData: FC<{ data: Item }> = ({ data }) => {
  const [item, setItem] = useState(data);

  const handleFavorite = (id: number, favorite: boolean) => {
    setFavoriteItem(id, favorite);
    setItem({ ...item, favorite });
  };

  return (
    <tr className="text-gray-500 hover:bg-white">
      <td
        className="border border-gray-300 px-4 py-2 cursor-pointer text-center"
        onClick={() => handleFavorite(item.id, !item.favorite)}
      >
        {item.favorite ? "❤️" : "♡"}
      </td>
      <td className="border border-gray-300 px-4 py-2">{item.name}</td>
      <td className="border border-gray-300 px-4 py-2">{item.rating}</td>
      <td className="border border-gray-300 px-4 py-2">{item.category}</td>
      <td className="border border-gray-300 px-4 py-2 text-end">
        {item.price}
      </td>
    </tr>
  );
};
