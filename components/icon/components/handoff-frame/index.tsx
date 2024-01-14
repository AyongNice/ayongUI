import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Handoff = (props: IconProps) => {
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
            <path d="M568.96 598.4H69.12a28.8 28.8 0 0 1-28.8-28.8V69.76a28.8 28.8 0 0 1 28.8-28.8h499.84a28.8 28.8 0 0 1 28.8 28.8v499.2a28.8 28.8 0 0 1-28.8 29.44z m-471.04-57.6h442.24V98.56H97.92z"/>
            <path d="M954.88 983.68H455.04a28.8 28.8 0 0 1-28.8-28.8v-384a28.8 28.8 0 0 1 28.8-28.8h85.12V454.4a28.8 28.8 0 0 1 28.8-28.8h384a28.8 28.8 0 0 1 28.8 28.8v499.84a28.8 28.8 0 0 1-26.88 29.44z m-471.04-57.6h442.24V483.84H597.76v85.12a28.8 28.8 0 0 1-28.8 28.8H483.84zM412.16 375.04h-192A22.4 22.4 0 0 1 192 352.64V278.4A22.4 22.4 0 0 1 217.6 256h192a22.4 22.4 0 0 1 22.4 22.4v74.24a22.4 22.4 0 0 1-19.84 22.4z m-172.16-44.8h149.76V300.8H240z"/>
            <path d="M314.88 465.28a22.4 22.4 0 0 1-22.4-22.4V192a22.4 22.4 0 1 1 44.8 0v256a22.4 22.4 0 0 1-22.4 17.28zM805.76 823.68a22.4 22.4 0 0 1-20.48-12.8l-73.6-156.8L640 810.24a22.4 22.4 0 0 1-40.32-19.2l93.44-200.32a22.4 22.4 0 0 1 20.48-12.8 22.4 22.4 0 0 1 20.48 12.8l93.44 200.32a22.4 22.4 0 0 1-20.48 32z"/>
            <path d="M757.76 743.04h-91.52a19.2 19.2 0 0 1 0-38.4h91.52a19.2 19.2 0 1 1 0 38.4z" />
        </svg>
    );
};

export default Handoff;