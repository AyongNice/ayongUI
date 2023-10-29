import but from './index.module.less';
//封装Button组件

interface ButtonProps {
    type?: 'primary' | 'default' | 'danger';
    size?: 'lg' | 'sm';
    disabled?: boolean;
    text?: string;
    onClick?: () => void;
}


export default function Button(props: ButtonProps = {}) {
    const {type, size, disabled, text, onClick} = props;
    return (
        <button className={but.ayongBtn} disabled={disabled} onClick={onClick}>
            {text}
        </button>

    )
}
export type {ButtonProps};



