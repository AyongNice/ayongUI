import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Replys = (props: IconProps) => {
    const {className = "", style = {}, onClick = () => {}} = props;
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
            <path d="M737.28 559.786667c-81.92-83.626667-182.613333-128-300.373333-131.413334v-143.36c0-11.946667-6.826667-22.186667-17.066667-25.6-10.24-5.12-22.186667-1.706667-30.72 6.826667L119.466667 542.72c-10.24 10.24-10.24 27.306667 0 37.546667l269.653333 291.84c8.533333 8.533333 20.48 11.946667 30.72 6.826666 10.24-3.413333 17.066667-13.653333 17.066667-25.6v-153.6c59.733333-8.533333 121.173333-5.12 187.733333 8.533334 68.266667 13.653333 146.773333 76.8 237.226667 186.026666 3.413333 3.413333 6.826667 5.12 10.24 5.12 1.706667 0 3.413333 0 5.12-1.706666 5.12-1.706667 8.533333-8.533333 8.533333-13.653334-13.653333-128-63.146667-237.226667-148.48-324.266666z"/>
        </svg>

    );
};

export default Replys;
