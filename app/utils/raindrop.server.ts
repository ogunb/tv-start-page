import { Item } from '~/types/item';
import { Collection } from '~/types/collection';
import { raindropApi } from './fetcher.server';

const DYNAMIC_LINK_COLLECTION_ID = 23419709;

type RaindropApiInformation = {
  result: false;
  errorMessage: string;
  status: number;
};

type FetchCollectionListResponse = {
  items?: ({ _id: string } & Collection)[];
} & RaindropApiInformation;
export async function fetchRaindropsList() {
  try {
    const response = await raindropApi.get<FetchCollectionListResponse>(
      `/rest/v1/collections`
    );

    if (!response.result) {
      throw new Error(response.errorMessage);
    }

    return response;
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}

type FetchCollectionResponse = {
  count?: number;
  items?: Item[];
} & RaindropApiInformation;
export async function fetchRaindrops(
  collectionId: string | number,
  params = {}
) {
  try {
    const queries = new URLSearchParams({ sort: 'title', ...params });
    const response = await raindropApi.get<FetchCollectionResponse>(
      `/rest/v1/raindrops/${collectionId}?${queries.toString()}`
    );

    if (!response.result) {
      throw new Error(response.errorMessage);
    }

    return response;
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}

type FetchDynamicLinkResponse = Item | undefined
export async function fetchDynamicLink(): Promise<FetchDynamicLinkResponse> {
  try {
    const response = await fetchRaindrops(DYNAMIC_LINK_COLLECTION_ID, {
      sort: '-created',
    });
    return response.items?.[0];
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}
