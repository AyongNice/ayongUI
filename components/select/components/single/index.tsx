import React, {useRef} from "react";
import selectStyle from './index.module.less';
import {Wrongs, Under, Search} from '../../../icon/icon.ts'
import {keyValue} from "../../../index.d";

const Single = ({
                  search,
                  options,
                  optionsMap,
                  selectedValues,
                  searchTerm,
                  onInputClick,
                  handleOnKeyDown,
                  onBlur = () => {
                  },
                  onFocus = () => {
                  },
                  onChange = () => {
                  },
                }) => {
  const inputRef = useRef<React.MutableRefObject<any>>(null);

  return <div className={selectStyle.selectValue}>
    {optionsMap.get(selectedValues) ?? '请选择'}
    {
      search && <>
        <input
          className={selectStyle.customSelectSelectionSearchInput}
          value={searchTerm}
          onClick={onInputClick}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleOnKeyDown}
          placeholder=''
          ref={inputRef}
        />
        <span>&nbsp;</span>
      </>
    }
  </div>
}


export default Single;
