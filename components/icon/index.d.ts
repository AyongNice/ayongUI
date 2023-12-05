import React from "react";

export interface IconProps {
    className?: string;//样式类名
    style?: {};//填充颜色
    onClick?: () => void;//点击事件
}

declare const Icon: React.FC<IconProps>;
export default Icon;
