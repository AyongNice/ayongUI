import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Bgcolor = (props: IconProps) => {
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
                d="M 766.4 744.3 c 43.7 0 79.4 -36.2 79.4 -80.5 c 0 -53.5 -79.4 -140.8 -79.4 -140.8 S 687 610.3 687 663.8 c 0 44.3 35.7 80.5 79.4 80.5 Z m -377.1 -44.1 c 7.1 7.1 18.6 7.1 25.6 0 l 256.1 -256 c 7.1 -7.1 7.1 -18.6 0 -25.6 l -256 -256 c -0.6 -0.6 -1.3 -1.2 -2 -1.7 l -78.2 -78.2 a 9.11 9.11 0 0 0 -12.8 0 l -48 48 a 9.11 9.11 0 0 0 0 12.8 l 67.2 67.2 l -207.8 207.9 c -7.1 7.1 -7.1 18.6 0 25.6 l 255.9 256 Z m 12.9 -448.6 l 178.9 178.9 H 223.4 l 178.8 -178.9 Z M 904 816 H 120 c -4.4 0 -8 3.6 -8 8 v 80 c 0 4.4 3.6 8 8 8 h 784 c 4.4 0 8 -3.6 8 -8 v -80 c 0 -4.4 -3.6 -8 -8 -8 Z"/>
        </svg>
    );
};

export default Bgcolor;
