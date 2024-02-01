import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Addsfile = (props: IconProps) => {
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
                <path d="M480 580.032H371.968a8 8 0 0 0-8 7.936v48c0 4.48 3.584 8.064 8 8.064H480v107.968c0 4.416 3.584 8 8 8h48a8 8 0 0 0 8-8v-108.032h108.032a8 8 0 0 0 7.936-7.936v-48a8 8 0 0 0-7.936-8.064H544V472a8 8 0 0 0-8-8h-48a8 8 0 0 0-8 8v108.032z m374.592-291.328a32 32 0 0 1 9.408 22.592V928a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32v-832A32 32 0 0 1 192 64h424.704c8.512 0 16.64 3.392 22.72 9.408l215.168 215.296z m-64.384 37.312l-188.16-188.16v188.16h188.16z"/>
        </svg>
    );
};
export default Addsfile;
