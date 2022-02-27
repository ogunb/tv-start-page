import {
  Form,
  useTransition,
  ActionFunction,
  json,
  redirect,
} from 'remix';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { useRef } from 'react';

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
