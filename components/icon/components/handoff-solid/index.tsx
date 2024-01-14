import React from "react";
import {IconProps} from "../../index";
import icon from "../../index.module.less";

const Handsolid = (props: IconProps) => {
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
            <path d="M651.743884 390.050909h325.585454A47.848727 47.848727 0 0 1 1024.014429 438.923636v536.203637A47.709091 47.709091 0 0 1 977.329338 1024H419.528611a47.848727 47.848727 0 0 1-46.685091-48.872727v-341.178182H46.69952A47.848727 47.848727 0 0 1 0.014429 585.076364V48.872727A47.709091 47.709091 0 0 1 46.69952 0H605.105338a47.848727 47.848727 0 0 1 46.685091 48.872727v341.178182zM46.69952 585.076364H605.105338V48.872727H46.69952v536.203637z m636.369455-16.523637l-102.446546 278.621091h45.521455l25.041454-71.68h113.850182l25.041455 71.68h43.799272l-103.005091-278.621091h-47.802181z m-22.202182 170.589091l44.404363-126.231273 47.243637 126.231273h-91.694546zM306.236975 113.710545h35.328V184.785455h135.447272v188.183272H441.730793v-22.155636H341.564975v130.792727h-33.605819v-130.792727H210.632611v22.155636h-35.281455V184.785455h132.608l-1.722181-71.07491zM210.632611 314.414545h96.768V221.184h-96.814546v93.230545z m130.932364 0H441.730793V221.184H341.564975v93.230545z"/>
        </svg>
    );
};

export default Handsolid;