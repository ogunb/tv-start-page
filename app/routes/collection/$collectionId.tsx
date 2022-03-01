import {
  ActionFunction,
  Link,
  LoaderFunction,
  redirect,
  useCatch,
  useLoaderData,
} from 'remix';
import { Item } from '~/types/item';
import { fetchRaindrops } from '~/utils/raindrop.server';
import ItemCard from '~/components/ItemCard';
import Button from '~/components/Button';

type LoaderData = {
  items: Item[];
  itemCount: number;
};
export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData | Response> => {
  if (!params.collectionId) {
    return redirect('/');
  }

  const { items: list, count } = await fetchRaindrops(params.collectionId);

  if (!list.length) {
    throw new Response(`Mate you sure you got sometin' in that collection?`, {
      status: 404,
    });
  }

  const items = list.map((item) => ({
    excerpt: item.excerpt,
    cover: item.cover,
    title: item.title,
    link: item.link,
  }));

  return {
    items,
    itemCount: count,
  };
};

export const action: ActionFunction = ({ request }) => {
  switch (request.method) {
    default: {
      throw new Response('Method not Allowed', { status: 405 });
    }
  }
};

export default function Collection() {
  const { items, itemCount } = useLoaderData<LoaderData>();

  return (
    <div className="py-5">
      <div className="flex flex-col mx-auto mb-5">
        <p className="text-center">Found total of {itemCount} items in your collection.</p>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {items.map((item) => (
          <ItemCard key={item.link} {...item} />
        ))}
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="max-w-3xl h-full flex flex-col items-center justify-center mx-auto text-center">
      <h2 className="mb-5">{caught.data}</h2>
      <Link to="/">
        <Button>Lets retry, shall we?</Button>
      </Link>
    </div>
  );
}
