import { createCookieSessionStorage, redirect } from 'remix';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'raindrop-session',
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
  },
});

export async function logout(request: Request) {
  const session = await getSession(request);

  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export async function createRaindropSession(
  accessToken: string,
  refreshToken: string,
  redirectTo: string = '/'
) {
  const session = await storage.getSession();
  session.set('accessToken', accessToken);
  session.set('refreshToken', refreshToken);

  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export function getSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getAccessToken(request: Request) {
  const session = await getSession(request);
  const accessToken = session.get('accessToken');
  if (!accessToken || typeof accessToken !== 'string') return null;
  return accessToken;
}

export async function getRefreshToken(request: Request) {
  const session = await getSession(request);
  const refreshToken = session.get('refreshToken');
  if (!refreshToken || typeof refreshToken !== 'string') return null;
  return refreshToken;
}

export async function requireAccessToken(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const accessToken = await getAccessToken(request);
  if (!accessToken || typeof accessToken !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return accessToken;
}
