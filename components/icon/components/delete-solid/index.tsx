import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Deletes = (props: IconProps) => {
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
            <path
                d="M 352 192 V 95.936 a 32 32 0 0 1 32 -32 h 256 a 32 32 0 0 1 32 32 V 192 h 256 a 32 32 0 1 1 0 64 H 96 a 32 32 0 0 1 0 -64 Z m 64 0 h 192 v -64 H 416 Z M 192 960 a 32 32 0 0 1 -32 -32 V 256 h 704 v 672 a 32 32 0 0 1 -32 32 Z m 224 -192 a 32 32 0 0 0 32 -32 V 416 a 32 32 0 0 0 -64 0 v 320 a 32 32 0 0 0 32 32 m 192 0 a 32 32 0 0 0 32 -32 V 416 a 32 32 0 0 0 -64 0 v 320 a 32 32 0 0 0 32 32"/>
        </svg>
    );
};

export default Deletes;