import {
  LoaderFunction,
  Form,
  useTransition,
  ActionFunction,
  json,
  redirect,
  useLoaderData,
} from 'remix';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { requireAccessToken } from '~/utils/session.server';
import { collectionIdCookie } from '~/utils/raindrop.server';
import { useRef } from 'react';

type LoaderData = {
  latestCollectionId: string | null;
};
export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData | Response> => {
  await requireAccessToken(request);
  const cookie = await collectionIdCookie.parse(request.headers.get('Cookie'));
  if (cookie?.collectionId) {
    return redirect(`/${cookie.collectionId}`);
  }

  const params = new URL(request.url).searchParams;
  const latestCollectionId = params.get('latest');

  return {
    latestCollectionId,
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

  return redirect(`/${collectionId}`, {
    headers: {
      'Set-Cookie': await collectionIdCookie.serialize({
        collectionId,
      }),
    },
  });
};

export default function Index() {
  const { latestCollectionId } = useLoaderData<LoaderData>();
  const transition = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);

  const isFetchingMovies = transition.state === 'submitting';

  return (
    <Form
      method="post"
      className="flex align-center justify-center flex-col max-w-xl m-auto h-full"
    >
      <Input
        ref={inputRef}
        defaultValue={latestCollectionId ?? ''}
        name="collectionId"
        placeholder="Collection ID"
        className="mb-1"
        onFocus={() => {
          inputRef.current?.select();
        }}
      />
      <p className="mb-2">
        I'm lazy so find your collection id and put it in (It's in the url)
      </p>

      <Button loading={isFetchingMovies} type="submit">
        Let's get your movies
      </Button>
    </Form>
  );
}
