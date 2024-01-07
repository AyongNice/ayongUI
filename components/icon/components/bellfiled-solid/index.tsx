import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Bellfiled = (props: IconProps) => {
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
            <path d="M 640 832 a 128 128 0 0 1 -256 0 Z m 192 -64 H 134.4 a 38.4 38.4 0 0 1 0 -76.8 H 192 V 448 c 0 -154.88 110.08 -284.16 256.32 -313.6 a 64 64 0 1 1 127.36 0 A 320.128 320.128 0 0 1 832 448 v 243.2 h 57.6 a 38.4 38.4 0 0 1 0 76.8 Z"/>
        </svg>
    );
};
export default Bellfiled;