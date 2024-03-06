import {RadioProps} from "./index.d";

import React, {useEffect, useState} from 'react';
import styleRadio from './index.module.less';
import _Button from '../button/index.tsx'
import {ButtonProps} from "ayongUI/components/radio";

const Radio = ({
                 value = '',
                 className,
                 checked = false,
                 disabled,
                 children,
                 isGroup = false,
                 onChange = () => {
                 },
               }: RadioProps) => {
  // 判断是否有 Radio.Group 父组件
  const [isChecked, setIsChecked] = useState(checked);
  const _className = `${styleRadio.label} ${className}`
  const handleChange = (event) => {
    onChange(!isChecked)
    setIsChecked(() => !isChecked);
  };
  useEffect(() => {
    setIsChecked(checked)
  }, [checked])
  if (isGroup) {
    // 如果存在 Radio.Group 父组件，则渲染多个 Radio
    return (
      <label className={`${_className} ${styleRadio.group} ${disabled ? styleRadio.disabled : ''}`}>
        <input type="radio"
               className={styleRadio.customRadio}
               value={value}
               checked={checked}
               onChange={onChange}
               disabled={disabled}/>
        {children}
      </label>
    );
  } else {
    // 如果不存在 Radio.Group 父组件，则渲染单个 Radio
    return (
      <label className={`${_className} ${disabled ? styleRadio.disabled : ''}`}>
        <input type="radio"
               value={value}
               className={styleRadio.customRadio}
               checked={isChecked}
               onClick={handleChange}
               onChange={() => {
               }}
               disabled={disabled}/>
        {children}
      </label>
    );
  }
};

const Button = ({
                  size,
                  index,
                  value,
                  isLast,
                  checked,
                  disabled=false,
                  children,
                  className,
                  isGroup = false,
                  onChange = () => {
                  },
                }: ButtonProps) => {
  // 判断是否有 Radio.Group 父组件
  const [isChecked, setIsChecked] = useState(checked);
  const _className = `${styleRadio.label} ${className}`
  const handleChange = (event) => {
    onChange(!isChecked)
    setIsChecked(() => !isChecked);
  };

  const onButton = () => {
    onChange(value)
  }
  const getClassName = () => {
    if (index && !isLast) {
      return styleRadio.button
    }
    if (!index) {

      return styleRadio.buttonFirst
    }
    if (isLast) {
      return styleRadio.buttonLast
    }
  }
  if (isGroup) {
    // 如果存在 Radio.Group 父组件，则渲染多个 Radio
    return (
      <label className={_className}>
        <_Button disabled={disabled} className={getClassName()}
                 type={checked ? 'primary' : 'default'} value={value}
                 size={size}
                 onClick={onButton}> {children}</_Button>
      </label>
    );
  } else {
    // 如果不存在 Radio.Group 父组件，则渲染单个 Radio
    return (
      <label className={_className}>
        <_Button disabled={disabled} type={isChecked ? 'primary' : 'default'}
                 onClick={handleChange}
                 size={size}
                 value={value}> {children}</_Button>
      </label>
    );
  }
};
const RadioGroup = ({
                      size,
                      children,
                      style,
                      disabled,
                      value,
                      onChange = () => {
                      },
                    }:RadioProps) => {
  const [setlect, setSetlect] = useState(value)
  const length = React.Children.count(children) - 1;

  const _onChange = (_value) => {
    onChange(_value)
    setSetlect(_value)

  }
  useEffect(() => {
    setSetlect(value)
  }, [value])

  return <div style={style}>
    {React.Children.map(children, (child, index) => {
      // 确保子元素是 Radio 组件
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          checked: setlect === child.props.value,
          disabled: child.props.disabled || disabled,
          isGroup: true,
          onChange: () => _onChange(child.props.value),
          index,
          size,
          isLast: length === index
        });
      }
      return null;
    })}
  </div>

};




Radio.Group = RadioGroup;
Radio.Button = Button;
export default Radio;
