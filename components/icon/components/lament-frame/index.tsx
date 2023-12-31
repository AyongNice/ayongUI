import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Laments = (props: IconProps) => {
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
            <path d="M448 224a64 64 0 10128 0 64 64 0 10-128 0zm96 168h-64c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8V400c0-4.4-3.6-8-8-8z"/>
        </svg>
    );
};

export default Laments;
