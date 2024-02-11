import React from "react";

export interface RadioProps {
    label: string;
    val: string;
    className?: string; // 自定义样式类名
    checkedIcon?: React.JSX; // icon图标
    disabled: boolean; // 禁用
    size?: "primary" | "default" | "dashed"; // 大小
    checked: boolean; // 是否选中
}

export function Radio(props: RadioProps): React.FC<Props>;
