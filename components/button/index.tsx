import but from './index.module.less';

//封装Button组件
// @ts-ignore
import {
    widthMap
} from '../../config/style-const.ts'

import {ButtonProps} from "./index.d"
import {useState} from "react";
import {useDebounce} from '../../utils/index.ts'
// import './index.less'

const Index = (props: ButtonProps) => {
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
        // const styleClassName: string = `${but.button} ${className} ${but[size] || ''} ${but[type] || ''} ${but[shape] || ''}${disabled && but.notAllowed || ''} ${isExpanded ? 'clicked' : ''}`;

        // const styleClassName = `ayongBtn ${size} ${type} ${shape} ${disabled && 'notAllowed'} ${isExpanded ? 'clicked' : ''} ${'ayongBtn'+className}`
    const dynamicStyles = {
            button: but.button,
            size: but[size] || '',
            type: but[type] || '',
            shape: but[shape] || '',
            notAllowed: disabled && but.notAllowed || '',
            clicked: isExpanded ? 'clicked' : '',
            ayongBtn: className
        };

    const styleClassName: string = Object.values(dynamicStyles).join(' ');
    //
    // const [_className, setClassName] = useState<string>(styleClassName)
    //
    // useEffect(() => {
    //     setClassName(() => {
    //         return styleClassName
    //     })
    // }, [className, shape, size, type, disabled, isExpanded])


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
}

export default Index

