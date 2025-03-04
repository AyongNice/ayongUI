import React from "react";

export interface RadioProps {
    value: string | number | boolean;//多个组合时候当前值
    className?: string; // 自定义样式类名最外层的样式
    checked?: boolean; // 是否选中 单个使用需要用到
    disabled: boolean; // 禁用
    isGroup: boolean;//是否多个
    style: object;//样式
    children: React.ReactNode; // 插槽内容
    size?: 'large' | 'default' | 'small' | 'mini'; // 按钮类型的大小 继承Button组件参数
    type?: 'primary' | 'dashed' | 'safe' | 'error' | 'warn'; // 按钮类型 继承Button组件参数
    onChange: () => void
}

export interface ButtonProps extends RadioProps {
    size: string;//大小
    isLast: boolean;//是否最后一个
    index: number;//当前索引
}


declare const Radio: React.FC<RadioProps>;

export default Radio;
