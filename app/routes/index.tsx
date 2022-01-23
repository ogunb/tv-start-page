import { Button, Input } from '@mantine/core';
import { ActionFunction, useActionData } from 'remix';

export const action: ActionFunction = async ({ request }) => {
  const fields = Object.fromEntries(await request.formData());
  return fields;
};

export default function Index() {
  const actionData = useActionData();
  console.log(actionData);
  return (
    <>
      <form method="post" action="/?index">
        <Input name="input" type="email" />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
