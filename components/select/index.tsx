import React, {useState, useRef, useEffect} from 'react';
import selectStyle from './index.module.less';
import Multiple from './components/multiple/index.tsx'
import {Wrong, Downwleftfu} from "../icon/icon.ts";
import table from "../table/index.module.less";
import unfold from "../table/components/unfold-button/index.module.less";

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


const CustomSelect = ({defaultValue, onChange, options, style, disabled, clearable}) => {
        const [searchTerm, setSearchTerm] = useState('');
        const [selectedValues, setSelectedValues] = useState(defaultValue);
        const [isDropdownVisible, setIsDropdownVisible] = useState(false);
        const [showClearable, setShowClearable] = useState<boolean>(false)
        // useEffect(() => {
        //     // 添加全局事件监听器
        //     document.addEventListener('mousedown', handlemousedown);
        //
        //     // 清除事件监听器
        //     return () => {
        //         document.removeEventListener('mousedown', handlemousedown);
        //     };
        // }, []); // 空数组表示只在组件挂载和卸载时执行
        const handleOptionClick = (value) => {
            console.log('handleOptionClick', value)
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
        const handlemousedown = (event) => {
            event.stopPropagation();
            console.log('handlemousedown')
            // setIsDropdownVisible(!isDropdownVisible);
        }
        const handleSelectClick = (event) => {
            event.stopPropagation();
            console.log('handleSelectClick')
            setIsDropdownVisible(!isDropdownVisible);
        };

        const handleInputChange = (e) => {
            console.log('handleInputChange', e.target.value)
            setSearchTerm(e.target.value);
        };
        const handleBlur = () => {
            // setIsDropdownVisible(false);
        };
        /**
         * 按下键盘 多选情况下从后面删除
         * @param event
         */
        const handleKeyDown = (): void => {
            if (!searchTerm.length) {
                setSelectedValues(selectedValues.slice(0, selectedValues.length - 1));
                onChange(selectedValues.slice(0, selectedValues.length - 1));
            }

        }
        const getWarpClassname = () => {
            const disabledName: string = disabled ? selectStyle.disabled : '';
            return isDropdownVisible ? `${selectStyle.customSelect} ${selectStyle.active} ${disabledName}` : `${selectStyle.customSelect} ${disabledName}`
        }
        const onMouseEnter = () => {
            if (clearable) setShowClearable(true);
        }

        const clearValue = () => {
            setSelectedValues([]);
            onChange([]);
        }

        return (
            <div style={style}
                 className={getWarpClassname()}>
                <main className={selectStyle.main}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={() => setShowClearable(false)}
                      onClick={handleSelectClick}>
                    {Array.isArray(selectedValues) ?
                        <React.Fragment>
                            <Multiple
                                selectedValues={selectedValues}
                                value={searchTerm}
                                onKeyDown={handleKeyDown}
                                handleOptionClick={handleOptionClick}
                                onInputClick={handleSelectClick}
                                onChange={handleInputChange}
                                onFocus={() => setIsDropdownVisible(true)}
                                onBlur={handleBlur}
                            />
                            <div className={selectStyle.iconBox}>
                                {showClearable ? <Wrong onClick={clearValue} className={selectStyle.close}/> :
                                    <Downwleftfu className={`${selectStyle.rotateTransform} ${
                                        isDropdownVisible ? selectStyle.rotate90 : ''
                                    }`}/>}

                            </div>

                        </React.Fragment>
                        : <div className={selectStyle.selectBox}>
                            <div
                                className={isDropdownVisible ? `${selectStyle.onValue} ${selectStyle.selectValue}` : selectStyle.selectValue}>{selectedValues}</div>
                            <Downwleftfu className={`${selectStyle.rotateTransform} ${
                                isDropdownVisible ? selectStyle.rotate90 : ''
                            }`}/>
                        </div>}
                </main>


                {isDropdownVisible && (
                    <ul className={selectStyle.dropdown}>
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
        );
    }
;

export default CustomSelect;
