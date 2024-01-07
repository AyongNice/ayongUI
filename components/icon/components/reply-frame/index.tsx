import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";
const Reply = (props: IconProps) => {
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
            <path d="M964.266667 916.48c-6.826667 0-15.36-3.413333-20.48-8.533333-107.52-131.413333-201.386667-206.506667-281.6-221.866667-75.093333-15.36-146.773333-20.48-216.746667-11.946667v177.493334c0 17.066667-10.24 32.426667-27.306667 39.253333-17.066667 6.826667-34.133333 1.706667-46.08-10.24L46.08 527.36c-15.36-17.066667-15.36-42.666667 0-58.026667L373.76 133.12c11.946667-11.946667 30.72-17.066667 46.08-10.24 15.36 6.826667 27.306667 22.186667 27.306667 39.253333v165.546667c139.946667 6.826667 261.12 61.44 361.813333 162.133333 105.813333 105.813333 165.546667 240.64 182.613333 399.36 1.706667 11.946667-5.12 22.186667-15.36 25.6-5.12 1.706667-8.533333 1.706667-11.946666 1.706667zM88.746667 498.346667l305.493333 331.093333V651.946667c0-11.946667 8.533333-23.893333 22.186667-25.6 80.213333-13.653333 167.253333-10.24 256 8.533333 76.8 17.066667 160.426667 73.386667 250.88 172.373333-25.6-109.226667-76.8-203.093333-153.6-279.893333-95.573333-97.28-213.333333-146.773333-349.866667-148.48-13.653333 0-25.6-11.946667-25.6-25.6v-168.96L88.746667 498.346667z"/>
        </svg>

    );
};

export default Reply;
