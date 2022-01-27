import { Outlet, LoaderFunction } from 'remix';
import { requireAccessToken } from '~/utils/session.server';

export const loader: LoaderFunction = ({ request }) => {
  return requireAccessToken(request);
}

export default function Index() {
  return <Outlet></Outlet>;
}
