import but from './index.module.less';
//封装Button组件
// @ts-ignore
import {
    widthMap
} from '../../config/style-const.ts'

import {ButtonProps} from "./button";
import {useEffect, useRef, useState} from "react";

// 自定义Hook，用于处理按钮防抖
function useDebounce(fn: Function, delay: number) {
    const refTimer = useRef<number>();

    return function f(...args: any) {
        if (refTimer.current) {
            clearTimeout(refTimer.current);
        }
        refTimer.current = setTimeout(() => {
            fn(args);
        }, delay);
    }
}

export default function Button(props: ButtonProps = {}) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const {
        type,
        size = 'default',
        children,
        className = '',
        disabled, text,
        onClick = () => {
        },
        time = 0
    } = props;
    const handleButtonClick = () => {
        // 当按钮被点击时，设置 isExpanded 为 true，触发扩展效果
        setIsExpanded(true);
        // 在一段时间后重置 isExpanded，以便可以再次触发效果
        setTimeout(() => {
            setIsExpanded(false);
        }, 1000); // 1秒后重置
    };
    const ayongClick = () => {
        handleButtonClick()
        onClick()
    }
    /**
     * 默认使用组件classname  参数className 覆盖默认样式
     * 参数className > 默认使用组件classname > 参数样式
     *
     */
    const combinedClassName = `${but.ayongBtn} ${className} ${but[size]} ${but[type]} ${disabled && but.notAllowed} ${isExpanded ? 'clicked' : ''}`;
    return (
        <button className={combinedClassName} onClick={time ? useDebounce(ayongClick, time) : ayongClick}
                disabled={disabled}>
            {children}
        </button>

    )
}



