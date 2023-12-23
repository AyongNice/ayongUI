import React, {useEffect, useState} from 'react';
import selectStyle from './index.module.less';
import Multiple from './components/multiple/index.tsx'
import {Wrongs, Under, Search} from "../icon/icon.ts";
import {SelectProps} from "./index.d";
import Option from "./components/option/index.tsx";


const LeftIcon = ({
                    search,
                    clearable,
                    searchTerm,
                    onInputClick,
                    showClearable,
                    clearValue,
                    collapseTags,
                    isDropdownVisible,
                    selectedValues,
                    handleOnKeyDown = () => {
                    },
                    onChange = () => {
                    },
                    onFocus = () => {
                    },
                    onBlur = () => {
                    },
                  }) => {
  return (
    <div className={Array.isArray(selectedValues) ? selectStyle.iconBox : selectStyle.selectBox}>
      {!Array.isArray(selectedValues) &&
        <div
          className={isDropdownVisible ? `${selectStyle.onValue} ${selectStyle.selectValue}` : selectStyle.selectValue}>{selectedValues}</div>}
      {search && !Array.isArray(selectedValues) && <input
        className={selectStyle.customSelectSelectionSearchInput}
        value={searchTerm}
        onClick={onInputClick}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={handleOnKeyDown}
        placeholder=''
      />}

      {showClearable ? <Wrongs onClick={clearValue} className={selectStyle.close}/> :
        (search && isDropdownVisible) ? <Search className={selectStyle.close}/> :
          <Under className={`${selectStyle.rotateTransform} ${
            isDropdownVisible ? selectStyle.rotate90 : ''
          }`}/>}

    </div>

  )
}
const CustomSelect: React.FC<SelectProps> = ({
                                               style,
                                               search,
                                               options,
                                               disabled,
                                               clearable,
                                               collapseTags,
                                               defaultValue,
                                               onChange = () => {
                                               },
                                               optionRender = null,
                                             }) => {
    const _style = {width: '200px', ...style}
    /** 搜索选项 **/
    const [searchTerm, setSearchTerm] = useState<string>('');
    /** 选择值 **/
    const [selectedValues, setSelectedValues] = useState<string | string[]>(defaultValue as string);
    /** 是否显示下拉框 **/
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    /** 是否显示清除按钮 **/
    const [showClearable, setShowClearable] = useState<boolean>(false);
    useEffect(() => {

      console.log(clearable, Array.isArray(selectedValues))
    }, [])


    /**
     * 点击选项
     * @param value
     */
    const handleOptionClick = (value: string) => {
      setSelectedValues((prevValues: string | string[]) => {
        if (Array.isArray(selectedValues)) {
          return prevValues.includes(value) ? prevValues.filter((v) => v !== value) : [...prevValues, value]
        }
        return value
      });
      setSearchTerm('');
      if (!Array.isArray(selectedValues)) {
        setIsDropdownVisible(false)
      }
      onChange(selectedValues);
    };

    const handleSelectClick = (event) => {
      if (disabled) return;
      event.stopPropagation();
      console.log('handleSelectClick')
      setIsDropdownVisible(!isDropdownVisible);
    };

    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };
    const handleBlur = () => {
      // setIsDropdownVisible(false);
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

    }

    /**
     * 获取select的className
     */
    const getWarpClassname = () => {
      const disabledName: string = disabled ? selectStyle.disabled : '';
      return isDropdownVisible ? `${selectStyle.customSelect} ${selectStyle.active} ${disabledName}` : `${selectStyle.customSelect} ${disabledName}`
    }
    /**
     * 鼠标移入显示清除按钮
     */
    const onMouseEnter = () => {
      if (clearable) setShowClearable(true);
    }

    /**
     * 清除多选选项
     */
    const clearValue = () => {
      setSelectedValues(Array.isArray(selectedValues) ? [] : '');
      onChange(Array.isArray(selectedValues) ? [] : '');
    }

    const onSearchChange = (e): void => {
      setSearchTerm(e.target.value);
    }

    return (
      <div style={_style}
           className={getWarpClassname()}>
        <main
          style={{height: Array.isArray(selectedValues) ? '100%' : '30px'}}
          className={selectStyle.main}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => setShowClearable(false)}
          onClick={handleSelectClick}>
          {Array.isArray(selectedValues) ?
            <React.Fragment>
              <Multiple
                value={searchTerm}
                collapseTags={collapseTags}
                showClearable={showClearable}
                selectedValues={selectedValues}
                onKeyDown={handleKeyDown}
                handleOptionClick={handleOptionClick}
                onChange={handleInputChange}
                onFocus={() => setIsDropdownVisible(true)}
                onBlur={handleBlur}
              />

              <LeftIcon
                search={search}
                clearable={clearable}
                clearValue={clearValue}
                showClearable={showClearable}
                selectedValues={selectedValues}
                isDropdownVisible={isDropdownVisible}/>


            </React.Fragment>
            : <LeftIcon
              search={search}
              searchTerm={searchTerm}
              onChange={onSearchChange}
              clearable={clearable}
              clearValue={clearValue}
              showClearable={showClearable}
              selectedValues={selectedValues}
              isDropdownVisible={isDropdownVisible}/>}
        </main>


        {isDropdownVisible &&
          <ul className={selectStyle.dropdown}>
            <Option options={options}
                    search={search}
                    optionRender={optionRender}
                    searchTerm={searchTerm}
                    selectedValues={selectedValues}
                    onClick={handleOptionClick}
            />
          </ul>
        }
      </div>
    );
  }
;

export default CustomSelect;
