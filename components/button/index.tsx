import but from './index.module.less';
//封装Button组件
// @ts-ignore
import {
    widthMap
} from '../../config/style-const.ts'

import {ButtonProps} from "./button";
import styles from '../../config/style.module.less';

export default function Button(props: ButtonProps = {}) {
    const {type, size, children, className = '', disabled, text, onClick} = props;

    //宽高样式
    const combinedClassName = `${but.ayongBtn} ${className}`;
    return (
        <button className={combinedClassName} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}



