import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
  useLoaderData,
} from 'remix';

import { fetchDynamicLink, fetchRaindropsList } from '~/utils/raindrop.server';
import { Collection } from '~/types/collection';
import CollectionList from '~/components/Collection/CollectionList';
import { Item } from '~/types/item';

type LoaderData = {
  collectionList: Collection[];
  dynamicLink: Item;
};
export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const [{ items: list }, dynamicLink] = await Promise.all([
    fetchRaindropsList(),
    fetchDynamicLink(),
  ]);

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
    dynamicLink,
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
  const { collectionList, dynamicLink } = useLoaderData<LoaderData>();

  return (
    <div className="mx-auto max-w-5xl p-4">
      {dynamicLink ? (
        <a
          className="block p-10 -ml-px text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 text-center text-2xl mb-6"
          href={dynamicLink.link}
        >
          {dynamicLink.title}
        </a>
      ) : null}

      <CollectionList list={collectionList}></CollectionList>
    </div>
  );
}
