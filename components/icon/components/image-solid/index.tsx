import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Image = (props: IconProps) => {
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
            <path d="M 96 896 a 32 32 0 0 1 -32 -32 V 160 a 32 32 0 0 1 32 -32 h 832 a 32 32 0 0 1 32 32 v 704 a 32 32 0 0 1 -32 32 Z m 315.52 -228.48 l -68.928 -68.928 a 32 32 0 0 0 -45.248 0 L 128 768.064 h 778.688 l -242.112 -290.56 a 32 32 0 0 0 -49.216 0 L 458.752 665.408 a 32 32 0 0 1 -47.232 2.112 M 256 384 a 96 96 0 1 0 192.064 -0.064 A 96 96 0 0 0 256 384"/>
        </svg>
    );
};

export default Image;
