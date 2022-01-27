import { redirect } from 'remix';
import { raindropApi } from './fetcher.server';
import { createRaindropSession } from './session.server';

const REDIRECT_URI = `${process.env.PUBLIC_URL}/login`;

export async function authorizeRaindrop() {
  const url = new URL('oauth/authorize', process.env.RAINDROP_URL);
  url.searchParams.append('redirect_uri', REDIRECT_URI);
  url.searchParams.append('client_id', process.env.RAINDROP_CLIENT_ID!);

  return redirect(url.toString());
}

export async function obtainAccessToken(code: string) {
  const body = JSON.stringify({
    grant_type: 'authorization_code',
    client_id: process.env.RAINDROP_CLIENT_ID,
    client_secret: process.env.RAINDROP_CLIENT_SECRET,
    code,
    redirect_uri: REDIRECT_URI,
  });

  try {
    const { access_token: accessToken, refresh_token: refreshToken } =
      await raindropApi.post('oauth/access_token', {
        body,
      });

    return createRaindropSession(accessToken, refreshToken);
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}
