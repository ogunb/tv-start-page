import { redirect } from 'remix';

const REDIRECT_URI = `${process.env.PUBLIC_URL}/login`;

const generateRaindropUrl = (path: string) => {
  return new URL(path, process.env.RAINDROP_URL);
};

export async function authorizeRaindrop() {
  const url = generateRaindropUrl('oauth/authorize');
  url.searchParams.append('redirect_uri', REDIRECT_URI);
  url.searchParams.append('client_id', process.env.RAINDROP_CLIENT_ID!);

  return redirect(url.toString());
}

export async function obtainAccessToken(code: string) {
  const url = generateRaindropUrl('oauth/access_token');
  const body = JSON.stringify({
    grant_type: 'authorization_code',
    client_id: process.env.RAINDROP_CLIENT_ID,
    client_secret: process.env.RAINDROP_CLIENT_SECRET,
    code,
    redirect_uri: REDIRECT_URI,
  });

  try {
    const response = await (
      await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
    ).json();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}
