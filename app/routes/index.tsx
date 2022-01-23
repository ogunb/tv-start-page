import { Button } from '@mantine/core';
import { ActionFunction } from 'remix';

export const action: ActionFunction = async (...args) => {
  console.log(args);
  return null;
};

export default function Index() {
  return (
    <form>
      <Button type="submit">Submit</Button>
    </form>
  );
}
