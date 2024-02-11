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
      <label className={`${_className} ${styleRadio.group}`}>
        <input type="radio" className={styleRadio.customRadio} value={value} checked={checked} onChange={onChange}
               disabled={disabled}/>
        {children}
      </label>
    );
  } else {
    // 如果不存在 Radio.Group 父组件，则渲染单个 Radio
    return (
      <label className={_className}>
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
  }, disabled, children, isGroup = false
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

  if (isGroup) {
    // 如果存在 Radio.Group 父组件，则渲染多个 Radio
    return (
      <label className={_className}>
        <_Button disabled={disabled} type={checked ? 'primary' : 'default'} value={value}
                 onClick={onButton}> {children}</_Button>
      </label>
    );
  } else {
    // 如果不存在 Radio.Group 父组件，则渲染单个 Radio
    return (
      <label className={_className}>
        <_Button disabled={disabled} type={isChecked ? 'primary' : 'default'} onClick={handleChange}
                 value={value}> {children}</_Button>
      </label>
    );
  }
};
const RadioGroup = ({children, value, onChange, type = Radio}) => {

  return <label>
    {React.Children.map(children, (child) => {
      // 确保子元素是 Radio 组件
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          checked: child.props.value === value,
          disabled: child.props.disabled,
          isGroup: true,
          onChange: () => onChange(child.props.value),
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
