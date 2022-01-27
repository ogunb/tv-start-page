import {
  LoaderFunction,
  Form,
  useTransition,
  ActionFunction,
  json,
  redirect,
} from 'remix';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { requireAccessToken } from '~/utils/session.server';
import { collectionIdCookie } from '~/utils/raindrop.server';

export const loader: LoaderFunction = async ({ request }) => {
  await requireAccessToken(request);
  const cookie = await collectionIdCookie.parse(
    request.headers.get('Cookie')
  );
  if (cookie?.collectionId) {
    return redirect(`/${cookie.collectionId}`);
  }

  return null;
};

type ActionData = {
  formError?: string;
  fields?: {
    collectionId: string;
  };
};
const badRequest = (data: ActionData) => json(data, { status: 400 });
export const action: ActionFunction = async ({ request }) => {
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
  const transition = useTransition();

  const isFetchingMovies = transition.state === 'submitting';

  return (
    <Form
      method="post"
      action="/?index"
      className="flex align-center justify-center flex-col max-w-xl m-auto h-full"
    >
      <Input name="collectionId" placeholder="Collection ID" className="mb-1" />
      <p className="mb-2">
        I'm lazy so find your collection id and put it in (It's in the url)
      </p>

      <Button loading={isFetchingMovies} type="submit">
        Let's get your movies
      </Button>
    </Form>
  );
}
