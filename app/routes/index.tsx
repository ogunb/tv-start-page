import { Outlet, LoaderFunction } from 'remix';
import { requireRaindropToken } from '~/utils/session.server';

export const loader: LoaderFunction = ({ request }) => {
  return requireRaindropToken(request);
}

export default function Index() {
  return <Outlet></Outlet>;
}
