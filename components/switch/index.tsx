import styles from "./index.module.less";
import {useState} from "react";
import {SwitchProps} from "./index.d";
import '../../config/style.module.less'

export default function Switch(props: SwitchProps) {
  const {
    value = false,
    style,
    title,
    className,
    disabled,
    activeColor = '#8aabec',
    inactiveColor = '#9b9ea4',
    onChange = (value: boolean) => {

    },
  } = props

  const [isChecked, setIsChecked] = useState<boolean>(value)

  const handleButtonClick = (): void => {
    setIsChecked(!isChecked);
  }

  const _onChange = (value: boolean): void => {
    onChange(value)
  }

  const wrapClassName = `${styles.ayongSwitch} ${isChecked ? styles.checked : ''} ${disabled ? 'disabled' : ''} $`

  return <div style={{display: 'flex'}} className={className}>
    <button disabled={disabled}
            type="button"
            onClick={_onChange}
            style={{background: isChecked ? activeColor : inactiveColor, cursor: disabled && 'not-allowed', ...style}}
            className={wrapClassName}
            onClick={handleButtonClick}>
      <div className={styles.handle}></div>
      <span className={styles.inner}></span>
    </button>
    <span className={styles.title}>{title}</span>
  </div>
}
