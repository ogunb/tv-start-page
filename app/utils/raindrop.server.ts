import { Item } from '~/types/item';
import { Collection } from '~/types/collection';
import { raindropApi } from './fetcher.server';

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
export async function fetchRaindrops(collectionId: string | number) {
  try {
    const response = await raindropApi.get<FetchCollectionResponse>(
      `/rest/v1/raindrops/${collectionId}?sort=title`
    );

    return response;
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}
