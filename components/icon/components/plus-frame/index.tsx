import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Plus = (props: IconProps) => {
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
                <path d="M791.457164 482.009422 542.361553 482.009422 542.361553 232.913811c0-17.190122-13.94987-31.139992-31.139992-31.139992-17.190122 0-31.139992 13.94987-31.139992 31.139992l0 249.095611L230.985958 482.009422C213.795836 482.009422 199.845966 495.959292 199.845966 513.149414c0 17.190122 13.94987 31.139992 31.139992 31.139992l249.095611 0 0 249.095611c0 17.224179 13.94987 31.139992 31.139992 31.139992 17.190122 0 31.139992-13.915813 31.139992-31.139992L542.361553 544.289406l249.095611 0c17.224179 0 31.139992-13.94987 31.139992-31.139992C822.597156 495.959292 808.681343 482.009422 791.457164 482.009422L791.457164 482.009422zM791.457164 482.009422"/>
        </svg>
    );
};

export default Plus;
