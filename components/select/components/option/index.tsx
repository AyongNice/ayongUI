import {Options, OptionsParma} from "../../../index.d";
import selectStyle from "./index.module.less";
import {Right, Empty} from '../../../icon/icon.ts'
import React, {useEffect} from "react";


const Option = ({options, optionRender, search, searchTerm, onClick, selectedValues = []}: OptionsParma) => {

    const getClassName = (option: Options): string => {
      if (!Array.isArray(selectedValues)) {
        selectedValues = [selectedValues]
      }
      const selectName: string = selectedValues.includes(option.value) ? selectStyle.selectOption : '';
      const disabled: string = option.disabled ? selectStyle.disabled : '';
      return `${selectStyle.customOption} ${selectName} ${disabled}`
    }
    const getClassNameRightIcon = (option: Options): string => {
      if (!Array.isArray(selectedValues)) {
        selectedValues = [selectedValues]
      }
      return selectedValues.includes(option.value) && !option.disabled ? selectStyle.iconActive : selectStyle.icon
    }
    const onSelectClick = (option: Options) => {
      if (option.disabled) return;
      console.log('onSelectClick', option)
      onClick(option.value);
    }
    const filteredOptions = search ? options.filter(option =>
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    ) : options;
    return (
      <>
        {
          filteredOptions.map((option) => (
            <div className={getClassName(option)} key={option.value} value={option.value}
                 onClick={() => onSelectClick(option)}>
              {typeof optionRender === 'function' ? optionRender(option) : option.label}
              <Right
                className={getClassNameRightIcon(option)}
              />
            </div>
          ))
        }

        {!filteredOptions.length && <div className={selectStyle.emptyBox}>
          <Empty className={selectStyle.empty}/>
          无匹配数据
        </div>}
      </>
    )
  }
;

export default Option;
