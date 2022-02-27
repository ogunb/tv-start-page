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
    <Link to={`/${id}`}>
      <div className="sm:flex items-center justify-between w-72 text-left space-x-3 px-4 h-12 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
        <div className="flex">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
        <p>{count}</p>
      </div>
    </Link>
  );
}
