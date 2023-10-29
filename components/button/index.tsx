import './index.css'

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
        <button className={`ayong-btn ayong-btn-${type} ayong-btn-${size}`} disabled={disabled} onClick={onClick}>
            {text}
        </button>
    )
}
export type {ButtonProps};