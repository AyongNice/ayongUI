import selectStyle from "../../index.module.less";
import {Wrong} from "../../../icon/icon.ts";
import React, {useEffect, useRef} from "react";


const Multiple = ({
                      selectedValues,
                      searchTerm,
                      handleOptionClick,
                      onInputClick,
                      onChange,
                      onFocus,
                      onBlur,
                      onKeyDown
                  }) => {
    const inputRef = useRef<React.MutableRefObject<any>>(null);

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


    return <div onClick={focus} className={selectStyle.customSelectSelector}>

        {selectedValues.map((value) => (
            <div key={value} className={selectStyle.customSelectSelectionOverflowItem}>

                <span className={selectStyle.customSelectSelectionItemContent}>{value}</span>
                <span
                    className={selectStyle.customSelectSelectionItemRemove}
                    onClick={() => handleOptionClick(value)}
                >
                  <Wrong className={selectStyle.close}/>
                </span>
            </div>
        ))}
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

    </div>
}
export default Multiple;
