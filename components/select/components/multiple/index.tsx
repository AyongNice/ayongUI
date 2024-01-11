import selectStyle from "../../index.module.less";
import commonStyle from "../../commo.module.less";
import {Wrong} from "../../../icon/icon.ts";
import React, {useEffect, useRef} from "react";
import Item from "./components/itme/index.tsx";

const Multiple = ({
                    mode,
                    search,
                    onKeyDown,
                    searchTerm,
                    onInputClick,
                    handleOptionClick,
                    selectedValues,
                    onBlur = () => {
                    },
                    onFocus = () => {
                    },
                    onChange = () => {
                    },
                    optionRender = () => {
                    },
                    handleDeltselectedValues = () => {
                    },
                  }) => {
  const inputRef = useRef<React.MutableRefObject<any>>(null);
  useEffect(() => {

    console.log('mode', mode)
  }, [])
  const focus = () => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }
  /**
   * 按下键盘 多选情况下从后面删除
   * @param event
   */
  const handleOnKeyDown = (event) => {
    if (event.key === 'Backspace') {
      onKeyDown();
    }
  }
  const deleteValue = (event: React.Event<HTMLOrSVGElement>, index: number) => {
    event.stopPropagation();
    handleDeltselectedValues(index)
  }

  // const selectedValuesList = ? selectedValues : selectedValues

  return <div onClick={focus} className={selectStyle.customSelectSelector}>

    {selectedValues.map((value, index) => (

      mode === 'tag' ? index === 0 ?
          <Item value={value} index={index} deleteValue={deleteValue} handleOptionClick={handleOptionClick}/>
          :
          index === 1 &&
          <div
            key={value}
            className={commonStyle.item}
          >
            +{selectedValues.length}
          </div>
        :
        <Item value={value} index={index} deleteValue={deleteValue} handleOptionClick={handleOptionClick}/>

    ))
    }

    {!selectedValues.length && '请选择'}

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
export default Multiple;
