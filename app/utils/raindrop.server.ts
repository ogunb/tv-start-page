import { Collection } from '~/types/collection';
import { raindropApi } from './fetcher.server';

type FetchCollectionResponse = {
  count: number;
  items: Collection[];
};
export async function fetchCollection(
  collectionId: string | number
): Promise<FetchCollectionResponse> {
  try {
    const response = await raindropApi.get<FetchCollectionResponse>(
      `/rest/v1/raindrops/${collectionId}?sort=title`
    );

    return response;
  } catch (err) {
    throw new Error(`Unhandled error: ${err}`);
  }
}
