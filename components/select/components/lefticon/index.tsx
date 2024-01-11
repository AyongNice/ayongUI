import React from "react";
import selectStyle from '../../index.module.less';
import {Wrongs, Under, Search} from '../../../icon/icon.ts'

const LeftIcon = ({
                    mode,
                    search,
                    clearable,
                    searchTerm,
                    onInputClick,
                    showClearable,
                    clearValue,
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
    <React.Fragment>
      {search && mode === 'single' && (
        <input
          className={selectStyle.customSelectSelectionSearchInput}
          value={searchTerm}
          onClick={onInputClick}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleOnKeyDown}
          placeholder=""
        />
      )}

      {showClearable ? (
        <Wrongs onClick={clearValue} className={selectStyle.icon}/>
      ) : search && isDropdownVisible ? (
        <Search className={selectStyle.icon}/>
      ) : (
        <Under
          className={`${selectStyle.icon} ${selectStyle.rotateTransform} ${
            isDropdownVisible ? selectStyle.rotate90 : ''
          }`}
        />
      )}

    </React.Fragment>

  )
}


export default LeftIcon;
