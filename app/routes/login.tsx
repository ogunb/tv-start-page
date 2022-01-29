import { ActionFunction, Form, useTransition } from 'remix';

import { LoaderFunction, redirect } from 'remix';
import Button from '~/components/Button';
import RaindropLogoUrl from '~/assets/icons/raindrop-logo.svg';
import { authorizeRaindrop, obtainAccessToken } from '~/utils/raindrop.server';
import {
  getAccessToken,
} from '~/utils/session.server';

export const loader: LoaderFunction = async ({ request }) => {
  if (await getAccessToken(request)) {
    return redirect('/');
  }

  const params = new URL(request.url).searchParams;
  const raindropCode = params.get('code');
  if (raindropCode) {
    return obtainAccessToken(raindropCode)
  }

  return null;
};

export const action: ActionFunction = () => {
  return authorizeRaindrop();
};

export default function Login() {
  const transition = useTransition();

  return (
    <Form
      method="post"
      className="flex w-full h-full items-center justify-center"
    >
      <Button loading={Boolean(transition.submission)} className="flex">
        <img
          src={RaindropLogoUrl}
          alt="Raindrop logo"
          height={24}
          width={24}
          className="mr-2"
        />
        <span>Login with Raindrop</span>
      </Button>
    </Form>
  );
}
