import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Bulb = (props: IconProps) => {
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
            <path d="M 384 960 v -64 h 192.064 v 64 Z m 448 -544 a 350.656 350.656 0 0 1 -128.32 271.424 C 665.344 719.04 640 763.776 640 813.504 V 832 H 320 v -14.336 c 0 -48 -19.392 -95.36 -57.216 -124.992 a 351.552 351.552 0 0 1 -128.448 -344.256 c 25.344 -136.448 133.888 -248.128 269.76 -276.48 A 352.384 352.384 0 0 1 832 416 m -544 32 c 0 -132.288 75.904 -224 192 -224 v -64 c -154.432 0 -256 122.752 -256 288 Z"/>
        </svg>
    );
};
export default Bulb;