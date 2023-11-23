import but from './index.module.less';
import React, {memo, useEffect} from "react";
//封装Button组件
// @ts-ignore
import {
    widthMap
} from '../../config/style-const.ts'

import {ButtonProps} from "./index.d.ts";
import {useState} from "react";
import {useDebounce} from '../../utils/index.ts'


const Button = React.memo((props: ButtonProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const {
        style = {},
        type = 'default',
        size = 'default',
        shape = 'default',
        children,
        href = '',
        htmlType = 'button',
        className = '',
        disabled, text,
        time = 0,
        icon = '',
        onClick = () => {
        },
    } = props;
    console.log('Button', onClick, +new Date())
    const handleButtonClick = (): void => {
        // 当按钮被点击时，设置 isExpanded 为 true，触发扩展效果
        setIsExpanded(true);
        // 在一段时间后重置 isExpanded，以便可以再次触发效果
        setTimeout(() => {
            setIsExpanded(false);
        }, 1000); // 1秒后重置
    };

    const ayongClick = (): void => {
        handleButtonClick()
        onClick()
        href && window.open(href);
    }
    /**
     * 默认使用组件classname  参数className 覆盖默认样式
     * 参数className > 默认使用组件classname > 参数样式
     *
     */
    const styleClassName: string = `${but.ayongBtn} ${className} ${but[size]} ${but[type]} ${but[shape]}  ${disabled && but.notAllowed} ${isExpanded ? 'clicked' : ''}`;
    return (
        <button
            style={style}
            className={styleClassName}
            onClick={time ? useDebounce(ayongClick, time) : ayongClick}
            disabled={disabled}
            type={htmlType}
        >
            {icon}{children}
        </button>

    )
})

export default Button

