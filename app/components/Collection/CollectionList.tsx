import { Collection } from '~/types/collection';
import CollectionCard from './CollectionCard';

type CollectionListProps = {
  list: Collection[]
}

export default function CollectionList({ list }: CollectionListProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {list.map((collection, index) => (
        <CollectionCard
          key={`card_${index}_${collection.title}`}
          {...collection}
        ></CollectionCard>
      ))}
    </div>
  );
}
