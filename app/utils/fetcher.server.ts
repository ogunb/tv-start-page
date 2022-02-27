export const raindropApi = fetcher(process.env.RAINDROP_API_URL!, {
  Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
});

function fetcher(baseURL: string, headers: { [key: string]: string } = {}) {
  const generateUrl = (path: string) => new URL(path, baseURL).toString();

  return {
    async get<T>(url: string, params: RequestInit = {}): Promise<T> {
      const response = await fetch(generateUrl(url), {
        method: 'GET',
        ...params,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...params.headers,
        },
      });
      return response.json();
    },

    async post<T>(url: string, params: RequestInit = {}): Promise<T> {
      const response = await fetch(generateUrl(url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...params.headers,
        },
        ...params,
      });

      return response.json();
    },

    async put<T>(url: string, params: RequestInit = {}): Promise<T> {
      const response = await fetch(generateUrl(url), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...params.headers,
        },
        ...params,
      });

      return response.json();
    },

    async delete<T>(url: string, params: RequestInit = {}): Promise<T> {
      const response = await fetch(generateUrl(url), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
          ...params.headers,
        },
        ...params,
      });

      return response.json();
    },
  };
}
