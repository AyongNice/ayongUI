import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Close = (props: IconProps) => {
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
           <path d="M512 80C273.794 80 80 273.794 80 512s193.794 432 432 432 432-193.794 432-432S750.206 80 512 80m0-80c282.77 0 512 229.23 512 512S794.77 1024 512 1024 0 794.77 0 512 229.23 0 512 0z"/><path d="M427.146 370.58L653.42 596.85a40 40 0 0 1-56.568 56.568L370.578 427.146a40 40 0 0 1 56.568-56.568z" /><path d="M653.42 427.146L427.15 653.42a40 40 0 0 1-56.568-56.568l226.274-226.274a40 40 0 0 1 56.568 56.568z"/>
        </svg>
    );
};

export default Close;
