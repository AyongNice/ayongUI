import React from "react";
import selectStyle from "./index.module.less";

const Single = ({ search, optionsMap, selectedValues, searchTerm, onInputClick, handleOnKeyDown, onBlur = () => {}, onFocus = () => {}, onChange = () => {} }) => {
  return (
    <div className={selectStyle.selectValue}>
      {optionsMap.get(selectedValues) ?? "请选择"}
      {search && (
        <>
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
          <span>&nbsp;</span>
        </>
      )}
    </div>
  );
};

export default Single;
