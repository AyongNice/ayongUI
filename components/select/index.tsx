import React, {useState} from 'react';
import selectStyle from './index.module.less';
import Multiple from './components/multiple/index.tsx'
import {Wrong, Downwleftfu} from "../icon/icon.ts";
import {SelectProps} from "./index.d";
import Option from "./components/option/index.tsx";

const CustomSelect: React.FC<SelectProps> = ({
                                                 defaultValue,
                                                 onChange = () => {
                                                 },
                                                 options,
                                                 style,
                                                 disabled,
                                                 clearable
                                             }) => {
        /** 搜索选项 **/
        const [searchTerm, setSearchTerm] = useState<string>('');
        /** 选择值 **/
        const [selectedValues, setSelectedValues] = useState<string | string[]>(defaultValue as string);
        /** 是否显示下拉框 **/
        const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
        /** 是否显示清除按钮 **/
        const [showClearable, setShowClearable] = useState<boolean>(false);

        /**
         * 点击选项
         * @param value
         */
        const handleOptionClick = (value: string) => {
            setSelectedValues((prevValues: string | string[]) => {
                if (Array.isArray(selectedValues)) {
                    return prevValues.includes(value) ? prevValues.filter((v) => v !== value) : [...prevValues, value]
                }
                return value
            });
            setSearchTerm('');
            if (!Array.isArray(selectedValues)) {
                setIsDropdownVisible(false)
            }
            onChange(selectedValues);
        };

        const handleSelectClick = (event) => {
            event.stopPropagation();
            console.log('handleSelectClick')
            setIsDropdownVisible(!isDropdownVisible);
        };

        const handleInputChange = (e) => {
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

        /**
         * 获取select的className
         */
        const getWarpClassname = () => {
            const disabledName: string = disabled ? selectStyle.disabled : '';
            return isDropdownVisible ? `${selectStyle.customSelect} ${selectStyle.active} ${disabledName}` : `${selectStyle.customSelect} ${disabledName}`
        }
        /**
         * 鼠标移入显示清除按钮
         */
        const onMouseEnter = () => {
            if (clearable) setShowClearable(true);
        }

        /**
         * 清除多选选项
         */
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


                {isDropdownVisible &&
                   <ul className={selectStyle.dropdown}>
                      <Option options={options}
                              selectedValues={selectedValues}
                              onClick={handleOptionClick}
                      />

                   </ul>}
            </div>
        );
    }
;

export default CustomSelect;
