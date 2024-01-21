import React from "react";
import { IconProps } from "../../index";
import icon from "../../index.module.less";

const Highlight = (props: IconProps) => {
    const { className = "", style = {}, onClick = () => {} } = props;
    const styleClassName: string = `${icon.default} ${className}`;
    return (
        <svg
            viewBox="0 0 1024 1024"
            className={styleClassName}
            style={{
                fill: style.color,
                ...style,
            }}
            onClick={onClick}
            focusable="false"
            data-icon="ayong"
        >
            <path d="M 957.6 507.4 L 603.2 158.2 a 7.9 7.9 0 0 0 -11.2 0 L 353.3 393.4 a 8.03 8.03 0 0 0 -0.1 11.3 l 0.1 0.1 l 40 39.4 l -117.2 115.3 a 8.03 8.03 0 0 0 -0.1 11.3 l 0.1 0.1 l 39.5 38.9 l -189.1 187 H 72.1 c -4.4 0 -8.1 3.6 -8.1 8 V 860 c 0 4.4 3.6 8 8 8 h 344.9 c 2.1 0 4.1 -0.8 5.6 -2.3 l 76.1 -75.6 l 40.4 39.8 a 7.9 7.9 0 0 0 11.2 0 l 117.1 -115.6 l 40.1 39.5 a 7.9 7.9 0 0 0 11.2 0 l 238.7 -235.2 c 3.4 -3 3.4 -8 0.3 -11.2 Z M 389.8 796.2 H 229.6 l 134.4 -133 l 80.1 78.9 l -54.3 54.1 Z m 154.8 -62.1 L 373.2 565.2 l 68.6 -67.6 l 171.4 168.9 l -68.6 67.6 Z M 713.1 658 L 450.3 399.1 L 597.6 254 l 262.8 259 l -147.3 145 Z"/>        </svg>
    );
};

export default Highlight;
