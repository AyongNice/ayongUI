import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Moon = (props: IconProps) => {
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
            <path d="M 240.448 240.448 a 384 384 0 1 0 559.424 525.696 a 448 448 0 0 1 -542.016 -542.08 a 390.592 390.592 0 0 0 -17.408 16.384 Z m 181.056 362.048 a 384 384 0 0 0 525.632 16.384 A 448 448 0 1 1 405.056 76.8 a 384 384 0 0 0 16.448 525.696"/>        </svg>
    );
};

export default Moon;