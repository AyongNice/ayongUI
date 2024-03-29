import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Downloads = (props: IconProps) => {
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
                <path d="M486.4 102.4c176.1792 0 320.384 136.8832 332.032 310.1184 116.48 18.0736 205.568 118.784 205.568 240.2816a243.2 243.2 0 0 1-256 242.8672V896H204.8l0.0256-1.8176a179.2 179.2 0 0 1-35.072-356.352A331.5968 331.5968 0 0 1 153.6 435.2C153.6 251.392 302.592 102.4 486.4 102.4z m76.8 281.6h-128v218.5984h-136.1408l200.1408 223.744 200.1408-223.744H563.2V384z"/>
        </svg>
    );
};
export default Downloads;
