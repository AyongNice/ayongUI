import React, {useState, useRef} from 'react';
import {DownOutlined, SearchOutlined} from '@ant-design/icons';
import selectStyle from './index.module.less';  // 请根据你的文件路径调整

const Option = ({value, label, onClick}) => (
    <div className={selectStyle.customOption} value={value} onClick={onClick}>
        {label}
    </div>
);

const CustomSelect = ({defaultValue, onChange, options,style}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const inputRef = useRef(null);

    const handleOptionClick = (value) => {
        setIsDropdownVisible(false);
        setSelectedValue(value); // 设置选中的值为选择框的值
        setSearchTerm(value); // 清空搜索框的值
        onChange(value);
    };

    const handleInputClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setIsDropdownVisible(true)
    };
    const handleBlur = () => {
        console.log('blur');
    }

    return (
        <div style={style} className={selectStyle.customSelect}>
            <div className={selectStyle.customSelectSelection} onClick={handleInputClick}>
                <div>{selectedValue}</div>
                <input
                    type="text"
                    value={searchTerm}  // 将值绑定到 searchTerm
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownVisible(true)}
                    onBlur={handleBlur}
                    placeholder={defaultValue}
                    ref={inputRef}
                />
                <DownOutlined/>
            </div>
            <div className={selectStyle.dropdown}>
                {isDropdownVisible && (
                    <div className={selectStyle.customSelectDropdown}>
                        <div className={selectStyle.optionsContainer}>
                            {options
                                .filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(option => (
                                    <Option
                                        key={option.value}
                                        value={option.value}
                                        label={option.label}
                                        onClick={() => handleOptionClick(option.value)}
                                    />
                                ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default CustomSelect;
