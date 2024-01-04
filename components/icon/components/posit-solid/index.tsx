import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Posit = (props: IconProps) => {
    const {className = "", style = {}, onClick = () => {}} = props;
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
            <path d="M 512 928 c 23.936 0 117.504 -68.352 192.064 -153.152 C 803.456 661.888 864 535.808 864 416 c 0 -189.632 -155.84 -320 -352 -320 S 160 226.368 160 416 c 0 120.32 60.544 246.4 159.936 359.232 C 394.432 859.84 488 928 512 928 m 0 -435.2 a 64 64 0 1 0 0 -128 a 64 64 0 0 0 0 128 m 0 140.8 a 204.8 204.8 0 1 1 0 -409.6 a 204.8 204.8 0 0 1 0 409.6"/>
        </svg>
    );
};

export default Posit;
