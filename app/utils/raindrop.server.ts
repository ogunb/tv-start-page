import { createCookie, redirect } from 'remix';
import { raindropApi, raindropOauthApi } from './fetcher.server';
import { createRaindropSession } from './session.server';

const REDIRECT_URI = `${process.env.PUBLIC_URL}/login`;

export const collectionIdCookie = createCookie('collection-id', { path: '/' });

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
      await raindropOauthApi.post('oauth/access_token', {
        body,
      });

    return createRaindropSession(accessToken, refreshToken);
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}

export async function fetchCollection(collectionId: string | number, accessToken: string) {
  try {
    const movies = await raindropApi.get(
      `/rest/v1/raindrops/${collectionId}?sort=title`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return movies;
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}
