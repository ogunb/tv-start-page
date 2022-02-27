import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
  useLoaderData,
} from 'remix';

import { fetchRaindropsList } from '~/utils/raindrop.server';
import { Collection } from '~/types/collection';
import CollectionList from '~/components/Collection/CollectionList';

type LoaderData = {
  collectionList: Collection[];
};
export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const { items: list } = await fetchRaindropsList();

  if (!list.length) {
    throw new Response(`You don't have any collections.`, {
      status: 404,
    });
  }

  const collectionList = list.map((collection) => ({
    id: collection._id,
    title: collection.title,
    description: collection.description,
    count: collection.count,
  }));

  return {
    collectionList,
  };
};

type ActionData = {
  formError?: string;
  fields?: {
    collectionId: string;
  };
};
const badRequest = (data: ActionData) => json(data, { status: 400 });
export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response> => {
  const { collectionId } = Object.fromEntries(await request.formData());

  if (!collectionId) {
    return badRequest({
      formError: `Form not submitted correctly.`,
    });
  }

  return redirect(`/${collectionId}`);
};

export default function Index() {
  const { collectionList } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto max-w-5xl p-4">
      <CollectionList list={collectionList}></CollectionList>
    </div>
  );
}
