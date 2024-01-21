import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Bell = (props: IconProps) => {
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
            <path d="M512 960c49.6 0 88-38.4 88-88H424c0 49.6 38.4 88 88 88z m288.8-286.4V444.8c0-137.6-97.6-252.8-224.8-283.2v-28.8c0-32-17.6-60.8-48-67.2-44-10.4-80 23.2-80 66.4v30.4C320.8 192 223.2 307.2 223.2 444.8v228.8L136 763.2v44.8h752v-44.8l-87.2-89.6z"/>
        </svg>
    );
};

export default Bell;
