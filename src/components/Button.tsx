import { Button } from '@mantine/core';
import { MouseEventHandler } from 'react';

type ButtonProps = React.PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

function FilledButton(props: ButtonProps) {
  return (
    <Button
      variant="gradient"
      gradient={{ from: 'orange', to: 'red' }}
      size="md"
      onClick={props.onClick ?? undefined}
    >
      {props.children}
    </Button>
  );
}

export const OutlineButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outline"
      style={{ color: 'white', borderColor: 'white', marginLeft: '1rem' }}
      size="lg"
      onClick={props.onClick ?? undefined}
    >
      {props.children}
    </Button>
  );
};

export default FilledButton;
