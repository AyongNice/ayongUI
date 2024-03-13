import {Options, OptionsParma} from "../../../index.d";
import selectStyle from "./index.module.less";
import {Right, Empty} from '../../../icon/icon.ts'
import React, {useEffect} from "react";


const Option = ({options, mode, optionRender, search, searchTerm, onClick, selectedValues = []}: OptionsParma) => {

    const getClassName = (option: Options, index: number): string => {
      if (!Array.isArray(selectedValues)) {
        selectedValues = [selectedValues]
      }
      const selectName: string = selectedValues.includes(option.value) ? selectStyle.selectOption : '';
      const disabled: string = option.disabled ? selectStyle.disabled : '';
      return `${selectStyle.customOption} ${selectName}   ${disabled}`
    }
    const getClassNameRightIcon = (option: Options): string => {
      if (!Array.isArray(selectedValues)) {
        selectedValues = [selectedValues]
      }
      return selectedValues.includes(option.value) && !option.disabled ? selectStyle.iconActive : selectStyle.icon
    }
    const onSelectClick = (event: React.DragEvent<HTMLDivElement>, option: Options) => {
      event.stopPropagation();
      if (option.disabled) return;
      onClick(option);
    }
    const filteredOptions = search ? options.filter(option =>
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
    ) : options;
    return (
      <>
        {
          filteredOptions.map((option, index) => (
            <div className={getClassName(option, index)} key={option.value} value={option.value}
                 onClick={(e) => onSelectClick(e, option)}>

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
