import { Item } from '~/types/item';

type ItemCardProps = Item

export function ItemCard({ name, description, cover }: ItemCardProps) {
  return (
    <div
      className="w-[350px] h-[550px] bg-top bg-no-repeat bg-cover relative rounded shadow-md hover:scale-105 transition-transform cursor-pointer hover:z-10 transform-gpu"
      style={{
        backgroundImage: `url(${cover})`,
      }}
    >
      <div className="absolute left-0 top-0 bg-gradient-to-t from-black to-transparent h-full w-full" />

      <div className="relative z-1 p-5 h-full flex flex-col justify-end">
        <h1>{name.replace('- IMDb', '')}</h1>
        <p className="truncate line-clamp-3 whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
}
