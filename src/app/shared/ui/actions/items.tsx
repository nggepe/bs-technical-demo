import { useMemo, type FC, type HtmlHTMLAttributes } from "react";
import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../../../../components/Inputs";
import { Select } from "../../../../components/Select";
import { findCategories } from "../../repositories/items";
import { setAndFormatSearchParams } from "../../../../utils/searchParams";

export const ItemActions: FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, favorite] = useMemo(() => {
    return [
      searchParams.get("category") || "",
      searchParams.get("favorite") || "",
    ];
  }, [searchParams]);

  const categories = useMemo(() => {
    return findCategories();
  }, []);

  const handleCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setAndFormatSearchParams(searchParams, "category", category);
    setSearchParams(searchParams);
  };

  const handleFavorite = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const favorite = e.target.value;
    setAndFormatSearchParams(searchParams, "favorite", favorite);
    setSearchParams(searchParams);
  };

  const debounced = useDebouncedCallback((value: string) => {
    setAndFormatSearchParams(searchParams, "search", value);
    setSearchParams(searchParams);
  }, 300);

  return (
    <div className="pb-3">
      <div className={`flex justify-between py-3 ${className}`} {...props}>
        <div className="flex justify-start gap-3">
          <Select
            defaultValue={favorite}
            onChange={handleFavorite}
            aria-label="favorite filter"
          >
            <option value="all">All</option>
            <option value="favorite">Favorite</option>
            <option value="non-favorite">Non-Favorite</option>
          </Select>
          <Select
            name="category"
            id="category"
            onChange={handleCategories}
            defaultValue={category}
            aria-label="category filter"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>
        <Input
          type="search"
          placeholder="Search..."
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => {
            debounced(e.target.value);
          }}
          aria-label="search items"
        />
      </div>
    </div>
  );
};
