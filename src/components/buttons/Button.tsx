import { MouseEventHandler } from 'react';

type ButtonProps = React.PropsWithChildren<{ onClick?: MouseEventHandler<HTMLButtonElement> }>;

function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick ?? undefined}>
      {props.children}
    </button>
  )
}

 export const OutlineButton = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick ?? undefined}>
    {props.children}
  </button>
)
  
}

export default Button;
