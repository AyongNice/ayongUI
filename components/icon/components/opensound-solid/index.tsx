import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Sounds = (props: IconProps) => {
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
                <path d="M93.184 768.073143A93.110857 93.110857 0 0 1 0.073143 674.742857V348.891429a93.110857 93.110857 0 0 1 93.110857-93.110858h186.148571l194.998858-169.033142a93.110857 93.110857 0 0 1 154.038857 70.363428v709.485714a93.110857 93.110857 0 0 1-154.038857 70.363429l-194.998858-169.033143z m778.24-585.801143a407.771429 407.771429 0 0 1 0 636.342857 34.962286 34.962286 0 0 1-43.885714-54.491428 337.92 337.92 0 0 0 0-527.36 34.962286 34.962286 0 0 1 43.885714-54.491429z m-130.706286 137.728a223.890286 223.890286 0 0 1 0 384.146286 34.962286 34.962286 0 1 1-38.326857-58.514286 154.258286 154.258286 0 0 0 0-267.483429 34.962286 34.962286 0 1 1 38.326857-58.514285z"/>
        </svg>
    );
};
export default Sounds;
