import but from './index.module.less';

//封装Button组件
// @ts-ignore
import {
  widthMap
} from '../../config/style-const.ts'

import {ButtonProps} from "./index.d"
import {useDebounce} from '../../utils/index.ts';
import coomStlye from '../../config/style.module.less';


const Button = (props: ButtonProps) => {
  const {
    style = {},
    type = 'default',
    size = 'default',
    shape = 'default',
    children,
    href = '',
    htmlType = 'button',
    className = '',
    disabled,
    text,
    time = 0,
    icon = '',
    onClick = () => {
    },
  } = props;


  const ayongClick = (): void => {
    onClick()
    href && window.open(href);
  }
  /**
   * 默认使用组件classname  参数className 覆盖默认样式
   * 参数className > 默认使用组件classname > 参数样式
   *
   */
  const dynamicStyles = {
    button: but.button,
    size: but[size] || '',
    type: but[type] || '',
    shape: but[shape] || '',
    notAllowed: disabled && coomStlye.disabled || '',
    clicked: '',
    ayongBtn: className
  };

  const styleClassName: string = Object.values(dynamicStyles).join(' ');

  return (
    <button
      style={style}
      className={styleClassName}
      onClick={time ? useDebounce(ayongClick, time) : ayongClick}
      disabled={disabled}
      type={htmlType}
    >
      {icon}{children}
    </button>

  )
}

export default Button

