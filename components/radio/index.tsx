import React, { useEffect, useState } from 'react';
import _Button from '../button/index.tsx';
import { ButtonProps, RadioProps } from './index.d';
import styleRadio from './index.module.less';

const Radio = ({
  value = false,
  className,
  disabled,
  children,
  isGroup = false,
  onChange = () => {},
}: RadioProps) => {
  // 判断是否有 Radio.Group 父组件
  const [isChecked, setIsChecked] = useState(value);
  const _className = `${styleRadio.label} ${className}`;
  const handleChange = (event) => {
    onChange(!isChecked);
    setIsChecked(() => !isChecked);
  };

  useEffect(() => {
    //解决在表单中调用onReset方法时，Radio组件的checked状态不会重置的问题 会清空value值 但是不会清空checked状态
    setIsChecked(value);
  }, [value]);

  if (isGroup) {
    // 如果存在 Radio.Group 父组件，则渲染多个 Radio
    return (
      <label
        className={`${_className} ${styleRadio.group} ${
          disabled ? styleRadio.disabled : ''
        }`}
      >
        <input
          type="radio"
          className={styleRadio.customRadio}
          value={value}
          checked={value}
          onChange={onChange}
          disabled={disabled}
        />
        {children}
      </label>
    );
  } else {
    // 如果不存在 Radio.Group 父组件，则渲染单个 Radio
    return (
      <label className={`${_className} ${disabled ? styleRadio.disabled : ''}`}>
        <input
          type="radio"
          value={value}
          className={styleRadio.customRadio}
          checked={isChecked}
          onClick={handleChange}
          onChange={() => {}}
          disabled={disabled}
        />
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
  disabled = false,
  children,
  className,
  isGroup = false,
  onChange = () => {},
}: ButtonProps) => {

  // 判断是否有 Radio.Group 父组件
  const [isChecked, setIsChecked] = useState(value);
  const _className = `${styleRadio.label} ${className}`;
  const handleChange = (event) => {
    onChange(!isChecked);
    setIsChecked(() => !isChecked);
  };

  const onButton = () => {
    onChange(value);
  };
  const getClassName = () => {
    if (!index) return styleRadio.buttonFirst;
    if (isLast) return styleRadio.buttonLast;
    if (!isLast) return styleRadio.buttonRight0;
  };
  if (isGroup) {
    // 如果存在 Radio.Group 父组件，则渲染多个 Radio
    return (
      <label className={_className}>
        <_Button
          disabled={disabled}
          className={getClassName()}
          type={value ? 'primary' : 'default'}
          value={value}
          size={size}
          onClick={onButton}
        >
          {' '}
          {children}
        </_Button>
      </label>
    );
  } else {
    // 如果不存在 Radio.Group 父组件，则渲染单个 Radio
    return (
      <label className={_className}>
        <_Button
          disabled={disabled}
          type={isChecked ? 'primary' : 'default'}
          onClick={handleChange}
          size={size}
          value={value}
        >
          {' '}
          {children}
        </_Button>
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
  onChange = () => {},
}: RadioProps) => {
  const [select, setSelect] = useState(value);
  const length = React.Children.count(children) - 1;

  const _onChange = (_value) => {
    onChange(_value);
    setSelect(_value);
  };

  return (
    <div style={style}>
      {React.Children.map(children, (child, index) => {
        // 确保子元素是 Radio 组件
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            value: select === child.props.value,
            disabled: child.props.disabled || disabled,
            isGroup: true,
            onChange: () => _onChange(child.props.value),
            index,
            size,
            isLast: length === index,
          });
        }
        return null;
      })}
    </div>
  );
};
RadioGroup.displayName = 'RadioGroup';

Button.displayName = 'Button';

Radio.Group = RadioGroup;
Radio.Button = Button;

Radio.displayName = 'Radio';
export default Radio;
