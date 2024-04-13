import React, { useEffect, useRef, useState } from "react";
import { Options, SelectProps, keyValue } from "./index.d";
import selectStyle from "./index.module.less";

import LeftIcon from "./components/lefticon/index.tsx";
import Multiple from "./components/multiple/index.tsx";
import Option from "./components/option/index.tsx";
import Single from "./components/single/index.tsx";

const Select = (props: React.FC<SelectProps>) => {
  const {
    mode = "single",
    style,
    bordered = true,
    value,
    search,
    options = [],
    disabled,
    className = "",
    clearable,
    defaultValue,
    optionRender = null,
    optionHeaderRender = null,
    onChange = () => {},
    children,
  } = props;
  const _style = { ...style };
  const optionsMap: Map<keyValue, keyValue> = new Map();

  let _options = options;

  if (!_options.length) {
    const _optionsList = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type.displayName === "Option") {
        return {
          value: child.props.value,
          label: child.props.children || child.props.label,
          disabled: child.props.disabled,
        };
      }
    });
    //存在Option 选项复制统一数据处理
    if (_optionsList) {
      _options = _optionsList;
    }
  }

  _options.forEach((item) => optionsMap.set(item.value, item.label));
  /** 搜索选项 **/
  const [searchTerm, setSearchTerm] = useState<string>("");
  /** 选择值 **/
  const [selectedValues, setSelectedValues] = useState<string | string[]>(defaultValue);
  /** 是否显示下拉框 **/
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  /** 是否显示清除按钮 **/
  const [showClearable, setShowClearable] = useState<boolean>(false);

  const dropdownRef = useRef(null);


  const selectRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const isFrist = useRef(true);
  useEffect(() => {
    //判断value 数组是否等于defaultValue
    if (isFrist.current) {
      isFrist.current = false;
      return;
    }
    if (["multiple", "tag"].includes(mode)) {
      defaultValue.forEach((_) => {
        if (!options.find((item) => item.value === _).disabled) {
          handleOptionClick(_);
        }
      });
      if (Array.isArray(value) && value.length) {
        setSelectedValues(value);
        setSearchTerm("");
      }
      setIsDropdownVisible(false);
    }

    if (mode === "single") {
      setSelectedValues(value);
      setSearchTerm("");
    }
  }, [value]);

  /**
   * 点击选项
   * @param value
   */
  const handleOptionClick = (option: Options, disabled: boolean) => {
    if (disabled) return;
    setSelectedValues((prevValues: string | string[]) => {
      if (Array.isArray(prevValues) && mode !== "single") {
        return Array.from(new Set([...prevValues, option.value]));
      }
      return option.value;
    });
    setSearchTerm("");
    onChange(option.value);
    if (mode === "single") setIsDropdownVisible(false);
  };


  const handleSelectClick = (e) => {
    e.stopPropagation();
    if (disabled) return;
    setIsDropdownVisible(!isDropdownVisible);
  };

 

  /**
   *  搜索输入框输入
   * @param e
   */
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * 按下键盘 多选情况下从后面删除
   * @param event
   */
  const handleKeyDown = (): void => {
    if (!searchTerm.length) {
      setSelectedValues(selectedValues.slice(0, selectedValues.length - 1));
      onChange(selectedValues.slice(0, selectedValues.length - 1));
    }
  };

  /**
   * 删除按钮
   * @param index
   */
  const handleDeltselectedValues = (index: number): void => {
    setSelectedValues(selectedValues.filter((_, i) => i !== index));
    onChange(selectedValues);
  };
  /**
   * 获取select外层外套的className
   */
  const getWarpClassname = (): string => {
    const disabledName: string = disabled ? selectStyle.disabled : "";
    return `${selectStyle.customSelect} ${disabledName} ${className}`;
  };
  /**
   * 获取select main标签的className
   */
  const getMainClassname = (): string => {
    const hover = disabled ? "" : selectStyle.mainHover;
    return isDropdownVisible ? `${selectStyle.main} ${hover} ${selectStyle.active}  ` : `${selectStyle.main} ${hover} `;
  };
  /**
   * 鼠标移入显示清除按钮
   */
  const onMouseEnter = () => {
    if (clearable) setShowClearable(true);
  };

  /**
   * 清除多选选项
   */
  const onClearValue = () => {
    setSelectedValues(Array.isArray(selectedValues) && mode !== "single" ? [] : "");

    onChange(Array.isArray(selectedValues) && mode !== "single" ? [] : "");
  };

  const onSearchChange = (e): void => {
    setSearchTerm(e.target.value);
  };
  return (
    <div style={_style} className={getWarpClassname()}>
      <main
        ref={selectRef}
        onClick={handleSelectClick}
        className={getMainClassname()}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setShowClearable(false)}
        style={{ border: !bordered && "none" }}
      >
        {["multiple", "tag"].includes(mode) ? (
          <React.Fragment>
            <Multiple
              {...props}
              searchTerm={searchTerm}
              optionsMap={optionsMap}
              showClearable={showClearable}
              selectedValues={selectedValues}
              onKeyDown={handleKeyDown}
              handleOptionClick={handleOptionClick}
              onChange={handleInputChange}
              handleDeltselectedValues={handleDeltselectedValues}
            />

            <LeftIcon search={search} onClearValue={onClearValue} showClearable={showClearable} isDropdownVisible={isDropdownVisible} />
          </React.Fragment>
        ) : (
          <div className={mode === "single" ? selectStyle.singleBox : selectStyle.multipleBox}>
            <Single
              {...props}
              searchTerm={searchTerm}
              optionsMap={optionsMap}
              showClearable={showClearable}
              selectedValues={selectedValues}
              onKeyDown={handleKeyDown}
              handleOptionClick={handleOptionClick}
              onChange={handleInputChange}
              handleDeltselectedValues={handleDeltselectedValues}
            />
            <LeftIcon search={search} onClearValue={onClearValue} showClearable={showClearable} isDropdownVisible={isDropdownVisible} />
          </div>
        )}
      </main>

      <ul ref={dropdownRef} className={`${selectStyle.dropdown} ${isDropdownVisible ? selectStyle.dropdownOpen : selectStyle.dropdownClose}`}>
        {typeof optionHeaderRender === "function" && <div className={selectStyle.optionHeader}>{optionHeaderRender()}</div>}
        <Option mode={mode} options={_options} search={search} optionRender={optionRender} searchTerm={searchTerm} selectedValues={selectedValues} onClick={handleOptionClick} />
      </ul>
    </div>
  );
};

Select.displayName = "Select";
Select.Option = () => {
  return <></>;
};
Select.Option.displayName = "Option";
export default Select;
