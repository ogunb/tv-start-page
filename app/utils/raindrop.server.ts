import { Item } from '~/types/item';
import { Collection } from '~/types/collection';
import { raindropApi } from './fetcher.server';

const DYNAMIC_LINK_COLLECTION_ID = 23419709;

type FetchCollectionListResponse = {
  items: ({ _id: string } & Collection)[];
};
export async function fetchRaindropsList() {
  try {
    const response = await raindropApi.get<FetchCollectionListResponse>(
      `/rest/v1/collections`
    );

    return response;
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}

type FetchCollectionResponse = {
  count: number;
  items: Item[];
};
export async function fetchRaindrops(
  collectionId: string | number,
  params = {}
) {
  try {
    const queries = new URLSearchParams({ sort: 'title', ...params });
    const response = await raindropApi.get<FetchCollectionResponse>(
      `/rest/v1/raindrops/${collectionId}?${queries.toString()}`
    );

    return response;
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}

type FetchDynamicLinkResponse = Item;
export async function fetchDynamicLink(): Promise<FetchDynamicLinkResponse> {
  try {
    const response = await fetchRaindrops(DYNAMIC_LINK_COLLECTION_ID, {
      sort: '-created',
    });
    return response.items[0];
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}
