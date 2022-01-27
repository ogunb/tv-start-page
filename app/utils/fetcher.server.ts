export const raindropOauthApi = fetcher(process.env.RAINDROP_URL!);
export const raindropApi = fetcher(process.env.RAINDROP_API_URL!);

function fetcher(baseURL: string) {
  const generateUrl = (path: string) => new URL(path, baseURL).toString();

  return {
    async get(url: string, params: RequestInit) {
      const response = await fetch(generateUrl(url), {
        method: 'GET',
        ...params,
        headers: {
          'Content-Type': 'application/json',
          ...params.headers,
        },
      });
      return response.json();
    },

    async post(url: string, params: RequestInit) {
      const response = await fetch(generateUrl(url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        ...params,
      });

      return response.json();
    },

    async put(url: string, params: RequestInit) {
      const response = await fetch(generateUrl(url), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        ...params,
      });

      return response.json();
    },

    async delete(url: string, params: RequestInit) {
      const response = await fetch(generateUrl(url), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        ...params,
      });

      return response.json();
    },
  };
}
