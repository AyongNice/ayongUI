import React from "react";

declare module 'Button' {
    export interface ButtonProps {
        type?: 'primary' | 'default' | 'danger';
        size?: 'lg' | 'sm';
        disabled?: boolean;
        text?: string;
        onClick?: () => void;
    }

    export function Button(props: ButtonProps): React.FC<Props>;
}
