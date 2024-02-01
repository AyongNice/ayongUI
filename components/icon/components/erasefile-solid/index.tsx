import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Erasefile = (props: IconProps) => {
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

                <path d="M875.008 301.568L597.504 21.504c-4.608-4.608-9.728-8.192-14.848-11.264l-4.096-2.048h-3.072c-9.216-4.608-18.944-7.168-29.184-7.68H200.192C160.256 0 128 32.256 128 72.192v879.616c0 39.936 32.256 72.192 72.192 72.192h623.616c39.936 0 72.192-32.256 72.192-72.192V352.256c0-18.944-7.68-36.864-20.992-50.688z m-200.704 368.128H349.696c-18.944 0-33.792-15.36-33.792-33.792 0-18.944 15.36-33.792 33.792-33.792h324.608c18.432-0.512 33.792 14.848 33.792 33.792 0 18.944-15.36 33.792-33.792 33.792z m-90.112-357.888V110.592l199.68 201.728-199.68-0.512z"/>
        </svg>
    );
};
export default Erasefile;
