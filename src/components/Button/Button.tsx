import classNames from "classnames";
import "./button.css";
type TButtonProps = {
  action?: () => void;
  className: string;
  text: string;
  disabled: boolean;
};

function Button({ text, action, disabled, className }: TButtonProps) {
  const btnClassNames = classNames(className);

  return (
    <button
      onClick={action}
      disabled={disabled}
      type='button'
      className={btnClassNames}>
      {text}
    </button>
  );
}

export default Button;
