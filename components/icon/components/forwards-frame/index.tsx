import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Forwards = (props: IconProps) => {
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
                <path d="M926.293333 268.373333l-170.666666-170.666666A42.496 42.496 0 1 0 695.466667 157.866667L793.173333 256H384c-188.16 0-341.333333 153.173333-341.333333 341.333333s153.173333 341.333333 341.333333 341.333334h72.106667c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667H384c-141.226667 0-256-114.773333-256-256s114.773333-256 256-256h409.173333l-97.706666 97.706667a42.496 42.496 0 0 0 0 60.16c8.106667 8.533333 18.773333 12.8 29.866666 12.8s21.76-4.266667 30.293334-12.373333l170.666666-170.666667c16.64-16.64 16.64-43.946667 0-60.586667z"/>
        </svg>
    );
};

export default Forwards;
