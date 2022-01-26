import { createCookieSessionStorage, redirect } from 'remix';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'my_watch_session',

    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function login() {
  console.log('TODO: LOGIN');
}

export async function logout(request: Request) {
  const session = await getRaindropSession(request);

  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export async function createRaindropSession(token: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set('raindropToken', token);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export function getRaindropSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getRaindropToken(request: Request) {
  const session = await getRaindropSession(request);
  const raindropToken = session.get('raindropToken');
  if (!raindropToken || typeof raindropToken !== 'string') return null;
  return raindropToken;
}

export async function requireRaindropToken(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const raindropToken = await getRaindropToken(request);
  if (!raindropToken || typeof raindropToken !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return raindropToken;
}
