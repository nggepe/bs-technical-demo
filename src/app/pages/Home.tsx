import { useEffect, useState, useTransition, type FC } from "react";
import Container from "../../components/Container";
import { ListViewWrapper } from "../../components/ListView";
import { useSearchParams } from "react-router";
import type { Item } from "../shared/types/items";
import { findManyItems } from "../shared/repositories/items";
import { ItemTable } from "../shared/ui/tables/items";
import { Pagination } from "../../components/Pagination";
import { ItemActions } from "../shared/ui/actions/items";

const Home: FC = () => {
  const [searchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    startTransition(async () => {
      const params = Object.fromEntries(searchParams.entries());
      const data = await findManyItems({ ...params });
      setItems(data);
    });
  }, [searchParams]);

  return (
    <Container>
      <section>
        <h1 className="text-3xl text-start font-bold text-gray-700">
          Products
        </h1>
        <div className="mb-5 text-gray-500">
          Find and choose your favorite products. You can click the table header
          to sort the products, click again to toggle the sort direction, and
          click the table header again to remove the sort.
        </div>
        <ListViewWrapper>
          <ItemActions></ItemActions>
          <ItemTable items={items} loading={isPending} />
          <Pagination length={items.length} />
        </ListViewWrapper>
      </section>
    </Container>
  );
};

export default Home;
