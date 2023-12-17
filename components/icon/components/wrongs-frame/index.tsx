import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Wrongs = (props: IconProps) => {
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
                d="M512 482.133333l196.266667-196.266666c8.533333-8.533333 21.333333-8.533333 29.866666 0 8.533333 8.533333 8.533333 21.333333 0 29.866666L541.866667 512l196.266666 196.266667c8.533333 8.533333 8.533333 21.333333 0 29.866666-8.533333 8.533333-21.333333 8.533333-29.866666 0L512 541.866667l-196.266667 196.266666c-8.533333 8.533333-21.333333 8.533333-29.866666 0-8.533333-8.533333-8.533333-21.333333 0-29.866666l196.266666-196.266667-200.533333-196.266667c-8.533333-8.533333-8.533333-21.333333 0-29.866666 8.533333-8.533333 21.333333-8.533333 29.866667 0l200.533333 196.266666z"/>
        </svg>
    );
};
export default Wrongs;
