import React from "react";
import './index.css'
//封装Button组件
export default function Button(props = {}) {
    const {type, size, disabled, text, onClick} = props;
    return (
        <button className={`ayong-btn ayong-btn-${type} ayong-btn-${size}`} disabled={disabled} onClick={onClick}>
            {text}
        </button>
    )
}