import PropTypes from 'prop-types';

type ButtonProps = React.PropsWithChildren<{ onClick?: () => void }>;


function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick?.() ?? (() => {})}>
      {props.children}
   </button>
  )
}

const OutlineButton = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick?.() ?? (() => {})}>
    {props.children}
    </button>
)
  
}

Button.propTypes = {
  onClick: PropTypes.func
}

export default Button;