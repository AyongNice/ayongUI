import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Nocontent = (props: IconProps) => {
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
            <path d="M755.80952381 234.5989418H268.19047619L130.57354497 442.64973545v346.75132275h762.85291006V442.64973545L755.80952381 234.5989418z m97.30708995 208.05079365H754.72592592V295.28042328l98.39068784 147.36931217zM303.94920635 269.27407408h416.1015873v173.37566137h-104.02539682c0 57.43068783-46.594709 104.02539683-104.02539683 104.02539682s-104.02539683-46.594709-104.02539683-104.02539682h-104.02539682V269.27407408z m-34.67513227 26.0063492v147.36931217h-98.39068784L269.27407408 295.28042328z m589.47724867 459.44550264H165.24867725V477.32486773h212.38518518c15.38708995 59.81460317 69.7837037 104.02539683 134.36613757 104.02539682s118.97904762-44.21079365 134.36613757-104.02539682h212.38518518v277.40105819z"/>
        </svg>
    );
};
export default Nocontent;
