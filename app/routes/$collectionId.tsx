import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useCatch,
  useLoaderData,
} from 'remix';
import { Show } from '~/types/show';
import { fetchCollection } from '~/utils/raindrop.server';
import { requireAccessToken } from '~/utils/session.server';
import Input from '~/components/Input';
import { ShowCard } from '~/components/ShowCard';
import Button from '~/components/Button';
import { collectionIdCookie } from '../utils/raindrop.server';

type LoaderData = {
  shows: Show[];
  showCount: number;
};
export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData | Response> => {
  const accessToken = await requireAccessToken(request);

  if (!params.collectionId) {
    return redirect('/');
  }

  const { items, count } = await fetchCollection(
    params.collectionId,
    accessToken
  );

  if (!items.length) {
    throw new Response(`Mate you sure you got sometin' in that collection?`, {
      status: 404,
    });
  }

  const shows = items.map((show) => ({
    description: show.excerpt,
    cover: show.cover,
    name: show.title,
    link: show.link,
  }));

  return {
    shows,
    showCount: count,
  };
};

const redirectToCollectionSelection = async (collectionId?: string) => {
  return redirect(`/?latest=${collectionId}`, {
    headers: {
      'Set-Cookie': await collectionIdCookie.serialize({
        collectionId: null,
      }),
    },
  });
};

export const action: ActionFunction = ({ request, params }) => {
  switch (request.method) {
    case 'DELETE': {
      return redirectToCollectionSelection(params.collectionId);
      break;
    }
    default: {
      throw new Response('Method not Allowed', { status: 405 });
    }
  }

  return null;
};

export default function Collection() {
  const { shows, showCount } = useLoaderData<LoaderData>();

  return (
    <div className="py-5 xl:px-20">
      <div className="flex flex-col mx-auto max-w-xl mb-5">
        <Form method="delete">
          <Button className="w-full mb-5">Change Collection</Button>
        </Form>
        <Input placeholder="Filter by name..." />
        <p>Found total of {showCount} items in your collection.</p>
      </div>

      <div className="flex flex-wrap gap-5 justify-center">
        {shows.map((show) => (
          <ShowCard key={show.link} {...show} />
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
