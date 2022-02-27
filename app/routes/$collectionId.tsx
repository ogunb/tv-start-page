import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useCatch,
  useLoaderData,
} from 'remix';
import { Item } from '~/types/item';
import { fetchCollection } from '~/utils/raindrop.server';
import { ItemCard } from '~/components/ItemCard';
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

  const { items: list, count } = await fetchCollection(params.collectionId);

  if (!list.length) {
    throw new Response(`Mate you sure you got sometin' in that collection?`, {
      status: 404,
    });
  }

  const items = list.map((item) => ({
    description: item.excerpt,
    cover: item.cover,
    name: item.title,
    link: item.link,
  }));

  return {
    items,
    itemCount: count,
  };
};

export const action: ActionFunction = ({ request }) => {
  switch (request.method) {
    case 'DELETE': {
      return redirect('/');
      break;
    }
    default: {
      throw new Response('Method not Allowed', { status: 405 });
    }
  }
};

export default function Collection() {
  const { items, itemCount } = useLoaderData<LoaderData>();

  return (
    <div className="py-5 xl:px-20">
      <div className="flex flex-col mx-auto max-w-xl mb-5">
        <Form method="delete">
          <Button className="w-full mb-5">Change Collection</Button>
        </Form>

        {/* TODO <Input placeholder="Filter by name..." /> */}
        <p>Found total of {itemCount} items in your collection.</p>
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
