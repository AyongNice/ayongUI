import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const User = (props: IconProps) => {
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
            <path d="M512 1024C229.205 1024 0 794.795 0 512S229.205 0 512 0s512 229.205 512 512-229.205 512-512 512z m0-496.47a170.667 170.667 0 1 0 0-341.333 170.667 170.667 0 0 0 0 341.334z m263.765 263.723a263.765 263.765 0 1 0-527.53 0h527.53z"/>
        </svg>
    );
};

export default User;