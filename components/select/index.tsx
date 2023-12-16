import React, {useState, useRef, useEffect} from 'react';
import selectStyle from './index.module.less';
import {Wrong} from '../icon/icon.ts'

const Option = ({option, onClick, selectedValues = []}) => {

    const getClassName = (): string => {
        const selectName: string = selectedValues.includes(option.value) ? selectStyle.selectOption : '';
        const disabled: string = option.disabled ? selectStyle.disabled : '';
        return `${selectStyle.customOption} ${selectName} ${disabled}`
    }
    const onSelectClick = () => {
        if (option.disabled) return;
        onClick();
    }
    return (

        <div className={getClassName()} value={option.value} onClick={onSelectClick}>
            {option.label}
        </div>
    )
};

const CustomSelect = ({defaultValue, onChange, options, style}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValues, setSelectedValues] = useState(defaultValue);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const inputRef = useRef(null);

    const handleOptionClick = (value) => {
        setSelectedValues((prevValues) => {
            if (Array.isArray(selectedValues)) {
                return prevValues.includes(value) ? prevValues.filter((v) => v !== value) : [...prevValues, value]
            }
            return value
        });
        setSearchTerm('');
        console.log(selectedValues)
        if (!Array.isArray(selectedValues)) {
            setIsDropdownVisible(false)
        }
        onChange(selectedValues);
    };

    const handleSelectClick = () => {
        setIsDropdownVisible(true);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearClick = () => {
        setSelectedValues([]);
        onChange([]);
    };

    const handleBlur = () => {
        // setIsDropdownVisible(false);
    };


    return (
        <div style={style} className={selectStyle.customSelect}>
            <main className={selectStyle.main} onClick={handleSelectClick}>
                {Array.isArray(selectedValues) ? <div className={selectStyle.customSelectSelector}>

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
                            onClick={handleSelectClick}
                            onChange={handleInputChange}
                            onFocus={() => setIsDropdownVisible(true)}
                            onBlur={handleBlur}
                            placeholder=''
                            ref={inputRef}
                        />
                        <span>&nbsp;</span>

                    </div>
                    : <main>{selectedValues}</main>}
            </main>


            <div className={selectStyle.dropdown}>
                {isDropdownVisible && (
                    <ul className={selectStyle.customSelectDropdownMenuItems}>
                        {options.map((option) => (
                            <Option
                                option={option}
                                selectedValues={selectedValues}
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;
