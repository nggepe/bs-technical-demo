import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useMemo, type FC } from "react";
import { useSearchParams } from "react-router";

export interface PaginationProps {
  length: number;
}

export const Pagination: FC<PaginationProps> = ({ length }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [limit, offset, page] = useMemo(() => {
    const limit = Number(searchParams.get("limit") || "10");
    const offset = Number(searchParams.get("offset") || "0");
    const page = offset / limit + 1;
    return [limit, offset, page];
  }, [searchParams]);

  const [canBeNext, canBePrev] = useMemo(() => {
    const canBeNext = length == limit;
    const canBePrev = offset > 0;
    return [canBeNext, canBePrev];
  }, [offset, limit, length]);

  const handlePagination = (direction: "prev" | "next") => {
    if (direction === "prev" && canBePrev) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        offset: (offset - limit).toString(),
      });
    }
    if (direction === "next" && canBeNext) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        offset: (offset + limit).toString(),
      });
    }
  };

  return (
    <div className="flex justify-end items-center mt-5">
      <button
        disabled={!canBePrev}
        className="bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 disabled:bg-blue-200"
        onClick={() => handlePagination("prev")}
        aria-label="Go to previous page"
      >
        <ArrowLeftIcon />
      </button>
      <span className="mx-4">{page}</span>
      <button
        disabled={!canBeNext}
        className="bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 disabled:bg-blue-200"
        onClick={() => handlePagination("next")}
        aria-label="Go to next page"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};
