import { ActionFunction, Form, useActionData, useTransition } from 'remix';
import Button from '~/components/Button';

export const action: ActionFunction = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return null;
};

export default function Index() {
  const actionData = useActionData();
  const transition = useTransition();
  console.log({ transition, actionData });
  return (
    <Form action="/?index" method="post">
      <fieldset disabled={transition.state !== 'idle'}>
        <Button loading={transition.state === 'submitting'} type="submit">
          button
        </Button>
      </fieldset>
    </Form>
  );
}
