import {RadioProps} from "./index.d";

import React, {useState} from 'react';
import styleRadio from './index.module.less';
import _Button from '../button/index.tsx'

const Radio = ({value, className, checked, onChange, disabled, children, isGroup = false}) => {
  // 判断是否有 Radio.Group 父组件
  const [isChecked, setIsChecked] = useState(checked);
  let isUseGroup = false
  const _className = `${styleRadio.label} ${className}`
  const handleChange = (event) => {
    onChange(!isChecked)
    setIsChecked(() => !isChecked);
  };

  if (isGroup) {
    // 如果存在 Radio.Group 父组件，则渲染多个 Radio
    return (
      <label className={`${_className} ${styleRadio.group} ${disabled ? styleRadio.disabled : ''}`}>
        <input type="radio" className={styleRadio.customRadio} value={value} checked={checked} onChange={onChange}
               disabled={disabled}/>
        {children}
      </label>
    );
  } else {
    // 如果不存在 Radio.Group 父组件，则渲染单个 Radio
    return (
      <label className={`${_className} ${disabled ? styleRadio.disabled : ''}`}>
        <input type="radio" value={value} className={`${styleRadio.customRadio} `}
               checked={isChecked} onClick={handleChange}
               onChange={onChange}
               disabled={disabled}/>
        {children}
      </label>
    );
  }
};

const Button = ({
                  value, className, checked, onChange = () => {
  }, disabled, children, isGroup = false, index, isLast, size,
                }) => {
  // 判断是否有 Radio.Group 父组件
  const [isChecked, setIsChecked] = useState(checked);
  let isUseGroup = false
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
      console.log('1')
      return styleRadio.button
    }
    if (!index) {

      return styleRadio.buttonFirst
    }
    if (isLast) {
      console.log('3')
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
const RadioGroup = ({children, value, onChange, size}) => {
  const length = React.Children.count(children) - 1;
  return <label>
    {React.Children.map(children, (child, index) => {
      console.log(index, React.Children.toArray().length)
      // 确保子元素是 Radio 组件
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          checked: child.props.value === value,
          disabled: child.props.disabled,
          isGroup: true,
          onChange: () => onChange(child.props.value),
          index,
          size,
          isLast: length === index
        });
      }
      return null;
    })}
  </label>

};


// const RadioGroup = (props) => {
//   return <Group {...props}/>
// };

Radio.Group = RadioGroup;
Radio.Button = Button;
export default Radio;
