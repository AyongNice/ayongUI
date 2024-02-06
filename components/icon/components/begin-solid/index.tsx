import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Begin = (props: IconProps) => {
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
                <path d="M512 0C229.227168 0 0 229.227168 0 512s229.227168 512 512 512S1024 794.772832 1024 512 794.772832 0 512 0z m-20.161312 635.748744a34.760883 34.760883 0 0 1-69.521767 0v-247.497488a34.760883 34.760883 0 0 1 69.521767 0z m125.139179 0a34.760883 34.760883 0 1 1-69.521766 0v-247.497488a34.760883 34.760883 0 0 1 69.521766 0z"/>
        </svg>
    );
};
export default Begin;
