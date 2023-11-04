import React from "react";

export interface ButtonProps {
    className: any;
    children: unknown;
    background?: string | number;
    color?: string | number;
    type?: 'primary' | 'default' | 'dashed';
    size?: 'large' | 'default' | 'small';
    disabled?: boolean;
    text?: string;
    onClick?: () => void;
    time: number;
}

export function Button(props: ButtonProps): React.FC<Props>;