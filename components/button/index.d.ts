import React from 'react';

export interface ButtonProps {
    time?: number; // 防抖时间设置 0 为不防抖
    href?: string; // 跳转连接
    className?: string; // 自定义样式类名
    children: React.ReactNode; // 按钮内容
    disabled?: boolean; // 禁用
    icon?: React.ReactElement; // icon图标
    type?: 'primary' | 'default' | 'dashed'; // 按钮类型 利用样式实现
    size?: 'large' | 'default' | 'small'; // 按钮大小 利用样式padding 实现
    shape?: 'circle' | 'default' | 'round'; // 按钮形状 利用样式border-radius 实现
    htmlType?: 'button' | 'submit' | 'reset'; // 原生button类型
    onClick?: () => void; // 点击事件
}



declare const Button: React.FC<ButtonProps>;

export default Button;
