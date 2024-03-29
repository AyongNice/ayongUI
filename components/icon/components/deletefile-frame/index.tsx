import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Deletefile = (props: IconProps) => {
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
                <path d="M877.94 345.53c-0.01-0.16-0.03-0.33-0.04-0.49-0.04-0.62-0.1-1.24-0.18-1.85-0.02-0.19-0.05-0.38-0.07-0.57-0.1-0.74-0.23-1.49-0.38-2.22-0.02-0.11-0.05-0.21-0.07-0.32-0.14-0.65-0.3-1.29-0.48-1.92-0.05-0.19-0.11-0.38-0.16-0.57-0.21-0.72-0.44-1.43-0.7-2.13l-0.09-0.24c-0.24-0.63-0.49-1.25-0.77-1.87l-0.27-0.6c-0.31-0.66-0.62-1.31-0.97-1.95-0.04-0.08-0.09-0.15-0.13-0.23-0.33-0.61-0.69-1.2-1.06-1.78-0.12-0.19-0.24-0.37-0.36-0.55-0.4-0.61-0.82-1.21-1.26-1.8-0.03-0.04-0.06-0.07-0.08-0.11-0.46-0.6-0.94-1.19-1.44-1.76-0.13-0.15-0.26-0.29-0.39-0.44-0.52-0.59-1.06-1.16-1.63-1.71L615.39 76.93c-0.56-0.54-1.14-1.06-1.72-1.56-0.15-0.12-0.29-0.25-0.44-0.37-0.58-0.48-1.17-0.94-1.78-1.38-0.08-0.06-0.17-0.11-0.25-0.17-0.54-0.38-1.09-0.75-1.65-1.1-0.18-0.11-0.35-0.22-0.53-0.33-0.62-0.37-1.25-0.73-1.9-1.07-0.13-0.07-0.26-0.12-0.38-0.19-0.56-0.28-1.12-0.55-1.69-0.8-0.18-0.08-0.37-0.16-0.55-0.24-0.67-0.28-1.35-0.54-2.04-0.78a5.94 5.94 0 0 1-0.39-0.13c-0.6-0.2-1.21-0.39-1.82-0.55a37.657 37.657 0 0 0-2.68-0.63l-0.37-0.06c-0.63-0.11-1.26-0.21-1.9-0.29-0.18-0.02-0.36-0.05-0.55-0.07-0.73-0.08-1.46-0.14-2.2-0.17-0.14-0.01-0.28-0.01-0.42-0.01-0.38-0.01-0.77-0.03-1.15-0.03H247c-52.38 0-95 42.62-95 95v718c0 52.38 42.62 95 95 95h536c52.38 0 95-42.62 95-95V347.49c0-0.65-0.02-1.31-0.06-1.96z m-121.03-33.04H625.97V184.95l130.94 127.54zM783 905H247c-13.79 0-25-11.21-25-25V162c0-13.79 11.21-25 25-25h308.97v210.49c0 19.33 15.67 35 35 35H808V880c0 13.79-11.21 25-25 25z"/>
                <path d="M613 619H396c-11.05 0-20-8.95-20-20s8.95-20 20-20h217c11.05 0 20 8.95 20 20s-8.95 20-20 20z"/>
        </svg>
    );
};
export default Deletefile;
