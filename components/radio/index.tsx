import {RadioProps} from "./radio";
export default function Radio(props: RadioProps) {
  const {
    label,
    val,
    className = "",
    checkedIcon = "",
    size = "default",
    disabled,
    checked,
  } = props;

  const styleClassName: string = `${className}`;
  return (
    <div>
      <input
        value={val}
        type="radio"
        className={styleClassName}
        disabled={disabled}
        name="name"
        checked={checked}
      />
      <label htmlFor={val}>{label}</label>
    </div>
  );
}
