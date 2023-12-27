import { InputProps } from './index.d'
import styles from './index.module.less'

export default function Input(props: InputProps) {
  const {
		value,
		disabled,
    type = 'text',
    className = '',
    size = 'normal',
    onFocus = () => {},
    onBlur = () => {},
    onKeyUp = () => {},
    onChange = () => {},
    placeholder = '请输入值',
  } = props
  /**
   * 默认使用组件classname  参数className 覆盖默认样式
   * 参数className > 默认使用组件classname > 参数样式
   *
   */
  const styleClassName= `${styles.ayongInput} ${className} ${styles[size]} 
												${styles[type]} ${disabled && styles.notAllowed} `

  return (
    <input
      type={type}
      value={value}
      onBlur={onBlur}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onChange={onChange}
      placeholder={placeholder}
      className={styleClassName}
    ></input>
  )
}
