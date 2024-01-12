import React, {useEffect, useRef, useState} from 'react';
import selectStyle from './index.module.less';
import {SelectProps, Options, keyValue} from './index.d';

import Multiple from './components/multiple/index.tsx';
import Option from './components/option/index.tsx';
import LeftIcon from './components/lefticon/index.tsx';
import Single from './components/single/index.tsx';

const CustomSelect = (props: React.FC<SelectProps>) => {
  const {
    mode = 'single',
    style,
    value,
    search,
    options,
    disabled,
    className = '',
    clearable,
    defaultValue,
    optionRender = null,
    optionHeaderRender = null,
    onChange = () => {
    },
  } = props;
  const _style = {...style};
  const optionsMap: Map<keyValue, keyValue> = new Map();
  options.forEach((item) => optionsMap.set(item.value, item.label));
  /** 搜索选项 **/
  const [searchTerm, setSearchTerm] = useState<string>('')
  /** 选择值 **/
  const [selectedValues, setSelectedValues] = useState<string | string[]>(defaultValue)
  /** 是否显示下拉框 **/
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  /** 是否显示清除按钮 **/
  const [showClearable, setShowClearable] = useState<boolean>(false);
  const select = useRef(null);
  useEffect(() => {

    const handleOutsideClick = (event) => {
      // 获取选择框的DOM元素
      const dropdownElement = select.current;

      // 检查点击事件是否发生在选择框之外，且不是在特定的div上
      if (dropdownElement && !dropdownElement.contains(event.target)) {

      }
      setIsDropdownVisible(false);
    };
    document.addEventListener('click', handleOutsideClick);


    return () => {
      document.removeEventListener('click', handleOutsideClick);

    };
  }, []);


  useEffect(() => {
    //判断value 数组是否等于defaultValue

    if (mode === 'multiple') {
      defaultValue.forEach((_) => {
        if (!options.find((item) => item.value === _).disabled) {
          handleOptionClick(_)
        }
      })
      if (Array.isArray(value) && value.length) {
        setSelectedValues(value)
        setSearchTerm('')
      }
      setIsDropdownVisible(false)
    }
  }, [value])

  /**
   * 点击选项
   * @param value
   */
  const handleOptionClick = (option: Options, disabled: boolean) => {
    if (disabled) return
    setSelectedValues((prevValues: string | string[]) => {
      if (Array.isArray(prevValues) && mode !== 'single') {
        return Array.from(new Set([...prevValues, option.value]))
      }
      return option.value
    })
    setSearchTerm('')
    onChange(option.value)
    if (mode === 'single') setIsDropdownVisible(false);
  }

  const handleSelectClick = (event) => {
    if (disabled) return
    event.stopPropagation()
    console.log('handleSelectClick')
    setIsDropdownVisible(!isDropdownVisible)
  }


  /**
   *  搜索输入框输入
   * @param e
   */
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  /**
   * 按下键盘 多选情况下从后面删除
   * @param event
   */
  const handleKeyDown = (): void => {
    if (!searchTerm.length) {
      setSelectedValues(selectedValues.slice(0, selectedValues.length - 1))
      onChange(selectedValues.slice(0, selectedValues.length - 1))
    }
  }

  /**
   * 删除按钮
   * @param index
   */
  const handleDeltselectedValues = (index: number): void => {
    setSelectedValues(selectedValues.filter((_, i) => i !== index));
    onChange(selectedValues)
  }
  /**
   * 获取select外层外套的className
   */
  const getWarpClassname = (): string => {
    const disabledName: string = disabled ? selectStyle.disabled : ''
    return `${selectStyle.customSelect} ${disabledName} ${className}`
  }
  /**
   * 获取select main标签的className
   */
  const getMainClassname = (): string => {
    return isDropdownVisible
      ? `${selectStyle.main} ${selectStyle.active}  `
      : `${selectStyle.main} `
  }
  /**
   * 鼠标移入显示清除按钮
   */
  const onMouseEnter = () => {
    if (clearable) setShowClearable(true)
  }

  /**
   * 清除多选选项
   */
  const clearValue = () => {
    setSelectedValues(Array.isArray(selectedValues) && mode !== 'single' ? [] : '')
    onChange(Array.isArray(selectedValues) && mode !== 'single' ? [] : '')
  }

  const onSearchChange = (e): void => {
    setSearchTerm(e.target.value)
  }

  return (
    <div style={_style} className={getWarpClassname()}>
      <main
        className={getMainClassname()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setShowClearable(false)}
        onClick={handleSelectClick}
      >
        {['multiple', 'tag'].includes(mode) ? (
          <React.Fragment>
            <Multiple
              {...props}
              value={searchTerm}
              optionsMap={optionsMap}
              showClearable={showClearable}
              selectedValues={selectedValues}
              onKeyDown={handleKeyDown}
              handleOptionClick={handleOptionClick}
              onChange={handleInputChange}
              handleDeltselectedValues={handleDeltselectedValues}
            />

            <LeftIcon
              {...props}
              isDropdownVisible={isDropdownVisible}
            />
          </React.Fragment>
        ) : (
          <div className={mode === 'single' ? selectStyle.singleBox : selectStyle.multipleBox}>
            <Single
              {...props}
              value={searchTerm}
              optionsMap={optionsMap}
              showClearable={showClearable}
              selectedValues={selectedValues}
              onKeyDown={handleKeyDown}
              handleOptionClick={handleOptionClick}
              onChange={handleInputChange}
              handleDeltselectedValues={handleDeltselectedValues}
            />
            <LeftIcon
              {...props}
              isDropdownVisible={isDropdownVisible}
            />

          </div>

        )}
      </main>

      {
        isDropdownVisible && (
          <ul className={selectStyle.dropdown}>
            {typeof optionHeaderRender === 'function' && (
              <div className={selectStyle.optionHeader}>{optionHeaderRender()}</div>
            )}
            <Option
              mode={mode}
              options={options}
              search={search}
              optionRender={optionRender}
              searchTerm={searchTerm}
              selectedValues={selectedValues}
              onClick={handleOptionClick}
            />
          </ul>
        )
      }
    </div>
  )
}
export default CustomSelect
