import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Empty = (props: IconProps) => {
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
            <path d="M831.7 369.4H193.6L64 602v290.3h897.2V602L831.7 369.4zM626.6 604.6c0 62.9-51 113.9-114 113.9s-114-51-114-113.9H117.5l103.8-198h582.5l103.8 198h-281zM502.2 131h39.1v140.6h-39.1zM236.855 200.802l27.647-27.647 99.419 99.418-27.648 27.648zM667.547 272.637l99.418-99.419 27.648 27.648-99.418 99.418z"/>
        </svg>
    );
};
export default Empty;
