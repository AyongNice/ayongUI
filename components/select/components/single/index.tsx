import React, {useRef} from "react";
import selectStyle from './index.module.less';
import {Wrongs, Under, Search} from '../../../icon/icon.ts'

const Single = ({
                  search,
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
  const isEmntyValue = (value: string | number): string | number => {
    if (value === 0) return value
    return value ?? '请选择'
  }
  const inputRef = useRef<React.MutableRefObject<any>>(null);

  return <div className={selectStyle.selectValue}>
    {isEmntyValue(selectedValues)}
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
