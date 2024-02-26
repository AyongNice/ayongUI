import React, {useEffect, useState} from 'react';
import styleCheck from './index.module.less';
import {Option, CheckboxGroupProps, CheckboxProps} from "./index.d";
import {isPromise} from '../../utils/index.ts'

const Checkbox = ({
                    value,
                    disabled,
                    children,
                    checked = false,
                    indeterminate = false,
                    onChange = () => {
                    },
                    onBeforSelect = (): boolean => true,
                  }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    if (disabled) return;
    setIsChecked(() => checked);
  }, [checked])
  const handleChange = async () => {
    if (disabled) return;
    try {
      const res = await isPromise(onBeforSelect)
      if (!res) return;
    } catch (e) {

    }
    onChange(!isChecked);
    setIsChecked(() => !isChecked);
  };
  return (
    <label className={`${styleCheck.label} ${disabled ? styleCheck.disabled : ''}`}>
      <input
        type="checkbox"
        value={value}
        className={`${styleCheck.customCheckbox} ${indeterminate ? styleCheck.indeterminate : ''}`}
        onClick={handleChange}
        checked={isChecked}
        onChange={() => {
        }}
        disabled={disabled}
      />
      <span className={`${isChecked ? styleCheck.okShow : styleCheck.ok}`}>&#x2714;</span>
      {children}
    </label>
  );

};

const CheckboxGroup = ({
                         options = [],
                         children,
                         value = [],
                         defaultValue = [],
                         onChange = () => {
                         },
                         onBeforSelect = (): boolean => true,
                       }: CheckboxGroupProps) => {
  let _options = options
  if (React.Children.count(children) > 0) {
    React.Children.map(children, (child: React.FC) => {
      _options.push({value: child.props.value, label: child.props.children})

    })
  }
  const [newValue, setNewValue] = useState([...defaultValue])

  useEffect(() => {
    onChange(newValue)
  }, [newValue])

  // 如果是普通数组格式
  return (
    <>
      {_options.map((option, index) => {
        return <Checkbox
          key={index}
          value={option.value}
          checked={value.includes(option.value)}
          onChange={async (checked: boolean) => {
            try {
              const res = await isPromise(onBeforSelect, option)
              if (!res) return;
            } catch (e) {

            }
            if (checked) {
              setNewValue((prevState) => [...prevState, option.value])
            } else {
              setNewValue((prevState) => prevState.filter(item => item !== option.value))
            }
          }}
        >
          {option.label}
        </Checkbox>
      })}
    </>
  );
};
Checkbox.Group = CheckboxGroup;

export default Checkbox;
