import styles from "./index.module.less";
import {useState} from "react";

export interface SwitchProps {
  checked?: boolean;
}

export default function Switch (props:SwitchProps){
  const { checked = false} = props

  const [isChecked, setIsChecked] = useState<boolean>(checked)

  const handleButtonClick = (): void => {
    setIsChecked(!isChecked);
  }

  const wrapClassName = `${styles.ayongSwitch} ${isChecked?styles.checked:''}`

  return (
    <button type="button" className={wrapClassName} onClick={handleButtonClick}>
      <div className={styles.handle}></div>
      <span className={styles.inner}></span>
    </button>
  )
}
