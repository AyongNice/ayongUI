import React from 'react';

export interface RateProps {
    className?: string; // 自定义样式类名
    count?: number;
    value?: number;
    disabled?: boolean;
    color?: string;
    onChange?: (selectedRating: number) => void;
    icon?: React.FC | string;
}

declare const Rate: React.FC<ButtonProps>;

export default Rate;
