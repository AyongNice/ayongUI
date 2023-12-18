import {Options, OptionsParma} from "../../../index.d";
import selectStyle from "../../index.module.less";
import React from "react";


const Option = ({options, onClick, selectedValues = []}: OptionsParma) => {

    const getClassName = (option: Options): string => {
        const selectName: string = selectedValues.includes(option.value) ? selectStyle.selectOption : '';
        const disabled: string = option.disabled ? selectStyle.disabled : '';
        return `${selectStyle.customOption} ${selectName} ${disabled}`
    }
    const onSelectClick = (option: Options) => {
        if (option.disabled) return;
        onClick(option.value);
    }
    return (
        <>
            {options.map((option) => (
                <div className={getClassName(option)} key={option.value} value={option.value}
                     onClick={() => onSelectClick(option)}>
                    {option.label}
                </div>
            ))}
        </>
    )
};

export default Option;
