import { LoaderFunction, redirect, useLoaderData } from 'remix';
import { fetchCollection } from '~/utils/raindrop.server';
import { requireAccessToken } from '~/utils/session.server';

type LoaderData = {
  // TODO
  movies: any[];
};
export const loader: LoaderFunction = async ({ request, params }) => {
  const accessToken = await requireAccessToken(request);
  if (!params.collectionId) {
    return redirect('/');
  }

  const movies = await fetchCollection(params.collectionId, accessToken);
  return movies;
};

export default function Collection() {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <div>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
