import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Sunny = (props: IconProps) => {
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
            <path d="M 512 704 a 192 192 0 1 0 0 -384 a 192 192 0 0 0 0 384 m 0 64 a 256 256 0 1 1 0 -512 a 256 256 0 0 1 0 512 m 0 -704 a 32 32 0 0 1 32 32 v 64 a 32 32 0 0 1 -64 0 V 96 a 32 32 0 0 1 32 -32 m 0 768 a 32 32 0 0 1 32 32 v 64 a 32 32 0 1 1 -64 0 v -64 a 32 32 0 0 1 32 -32 M 195.2 195.2 a 32 32 0 0 1 45.248 0 l 45.248 45.248 a 32 32 0 1 1 -45.248 45.248 L 195.2 240.448 a 32 32 0 0 1 0 -45.248 Z m 543.104 543.104 a 32 32 0 0 1 45.248 0 l 45.248 45.248 a 32 32 0 0 1 -45.248 45.248 l -45.248 -45.248 a 32 32 0 0 1 0 -45.248 M 64 512 a 32 32 0 0 1 32 -32 h 64 a 32 32 0 0 1 0 64 H 96 a 32 32 0 0 1 -32 -32 m 768 0 a 32 32 0 0 1 32 -32 h 64 a 32 32 0 1 1 0 64 h -64 a 32 32 0 0 1 -32 -32 M 195.2 828.8 a 32 32 0 0 1 0 -45.248 l 45.248 -45.248 a 32 32 0 0 1 45.248 45.248 L 240.448 828.8 a 32 32 0 0 1 -45.248 0 Z m 543.104 -543.104 a 32 32 0 0 1 0 -45.248 l 45.248 -45.248 a 32 32 0 0 1 45.248 45.248 l -45.248 45.248 a 32 32 0 0 1 -45.248 0"/>        </svg>
    );
};

export default Sunny;