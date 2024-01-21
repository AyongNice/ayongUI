import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Wrongs = (props: IconProps) => {
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
            <path d="M 799.86 166.31 c 0.02 0 0.04 0.02 0.08 0.06 l 57.69 57.7 c 0.04 0.03 0.05 0.05 0.06 0.08 a 0.12 0.12 0 0 1 0 0.06 c 0 0.03 -0.02 0.05 -0.06 0.09 L 569.93 512 l 287.7 287.7 c 0.04 0.04 0.05 0.06 0.06 0.09 a 0.12 0.12 0 0 1 0 0.07 c 0 0.02 -0.02 0.04 -0.06 0.08 l -57.7 57.69 c -0.03 0.04 -0.05 0.05 -0.07 0.06 a 0.12 0.12 0 0 1 -0.07 0 c -0.03 0 -0.05 -0.02 -0.09 -0.06 L 512 569.93 l -287.7 287.7 c -0.04 0.04 -0.06 0.05 -0.09 0.06 a 0.12 0.12 0 0 1 -0.07 0 c -0.02 0 -0.04 -0.02 -0.08 -0.06 l -57.69 -57.7 c -0.04 -0.03 -0.05 -0.05 -0.06 -0.07 a 0.12 0.12 0 0 1 0 -0.07 c 0 -0.03 0.02 -0.05 0.06 -0.09 L 454.07 512 l -287.7 -287.7 c -0.04 -0.04 -0.05 -0.06 -0.06 -0.09 a 0.12 0.12 0 0 1 0 -0.07 c 0 -0.02 0.02 -0.04 0.06 -0.08 l 57.7 -57.69 c 0.03 -0.04 0.05 -0.05 0.07 -0.06 a 0.12 0.12 0 0 1 0.07 0 c 0.03 0 0.05 0.02 0.09 0.06 L 512 454.07 l 287.7 -287.7 c 0.04 -0.04 0.06 -0.05 0.09 -0.06 a 0.12 0.12 0 0 1 0.07 0 Z"/>        </svg>
    );
};
export default Wrongs;
