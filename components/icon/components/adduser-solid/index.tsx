import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Addser = (props: IconProps) => {
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
            <path d="M440.32 542.72c135.168 0 245.76-110.592 245.76-245.76s-110.592-245.76-245.76-245.76-245.76 110.592-245.76 245.76 110.592 245.76 245.76 245.76z m122.88 122.88c0-47.104 14.336-90.112 36.864-126.976-36.864 28.672-94.208 45.056-159.744 45.056-73.728 0-139.264-24.576-176.128-59.392C120.832 540.672 10.24 661.504 10.24 808.96v40.96c0 67.584 55.296 122.88 122.88 122.88h614.4c47.104 0 88.064-26.624 108.544-65.536-16.384 2.048-30.72 4.096-47.104 4.096-135.168 0-245.76-110.592-245.76-245.76z m245.76-204.8c-112.64 0-204.8 92.16-204.8 204.8s92.16 204.8 204.8 204.8 204.8-92.16 204.8-204.8-92.16-204.8-204.8-204.8z m122.88 225.28h-102.4v102.4h-40.96v-102.4h-102.4v-40.96h102.4v-102.4h40.96v102.4h102.4v40.96z"/>
        </svg>
    );
};

export default Addser;