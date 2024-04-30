import { Link } from 'remix';
import { Collection } from '~/types/collection';

type CollectionCardProps = Collection;

export default function CollectionCard({
  id,
  title,
  description,
  count,
}: CollectionCardProps) {
  return (
    <Link to={`/collection/${id}`}>
      <div className="sm:flex items-center justify-between w-72 text-left space-x-3 px-4 h-12 shadow-sm rounded-lg text-black-400 dark:bg-black-800 dark:text-black-300 dark:highlight-white/5 dark:hover:bg-black-700">
        <div className="flex">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
        <p>{count}</p>
      </div>
    </Link>
  );
}
