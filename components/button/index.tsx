import React from 'react';
import but from './index.module.less';
 

import coomStlye from '../../config/style.module.less';
import { useDebounce } from '../../utils/index.ts';
import { Loading } from '../icon/icon.ts';
import { ButtonProps } from './index.d';

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
    text = '',
    time = 0,
    icon = '',
    loading = false,
    onClick = () => {},
  } = props;

  const ayongClick = (): void => {
    onClick();
    href && window.open(href);
  };
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
    notAllowed: (disabled && coomStlye.disabled) || '',
    clicked: '',
    ayongBtn: className,
  };

  const styleClassName: string = Object.values(dynamicStyles).join(' ');

 
  return (
    <button
      style={{
        ...style,
        ...(shape === 'circle' ? { padding: '7px 10px' } : {}),
      }}
      className={`${styleClassName} ${disabled ? '' : but.mutual} ${
        loading ? but.loading : ''
      }`}
      onClick={time ? useDebounce(ayongClick, time) : ayongClick}
      disabled={disabled}
      type={htmlType}
    >
      {loading && <Loading />}
      {icon &&
        React.createElement(icon.type, {
          className: `${type !== 'default' ? but.iconWihe : but.icon}`,
        })}{' '}
      {children || text}
    </button>
  );
};

export default Button;
