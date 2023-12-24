import {Options, OptionsParma} from "../../../index.d";
import selectStyle from "../../index.module.less";
import {Tick, Empty} from '../../../icon/icon.ts'
import React from "react";


const Option = ({options, optionRender, search, searchTerm, onClick, selectedValues = []}: OptionsParma) => {

  const getClassName = (option: Options): string => {
    const selectName: string = selectedValues.includes(option.value) ? selectStyle.selectOption : '';
    const disabled: string = option.disabled ? selectStyle.disabled : '';
    return `${selectStyle.customOption} ${selectName} ${disabled}`
  }
  const onSelectClick = (option: Options) => {
    if (option.disabled) return;
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
            <Tick
              className={`${selectedValues.includes(option.value) && selectStyle.iconActive} ${selectStyle.icon}`}
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
};

export default Option;
