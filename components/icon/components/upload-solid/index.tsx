import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Uploadss = (props: IconProps) => {
    const {
        className = "", style = {}, onClick = () => {
        }
    } = props;
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
            <path d="M 544 864 V 672 h 128 L 512 480 L 352 672 h 128 v 192 H 320 v -1.6 c -5.376 0.32 -10.496 1.6 -16 1.6 A 240 240 0 0 1 64 624 c 0 -123.136 93.12 -223.488 212.608 -237.248 A 239.808 239.808 0 0 1 512 192 a 239.872 239.872 0 0 1 235.456 194.752 c 119.488 13.76 212.48 114.112 212.48 237.248 a 240 240 0 0 1 -240 240 c -5.376 0 -10.56 -1.28 -16 -1.6 v 1.6 Z"/>        </svg>
    );
};

export default Uploadss;