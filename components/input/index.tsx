import styles from './index.module.less';
import { useState } from 'react';
import { ButtonProps } from './index.d.ts';

export default function Input(props: InputProps) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const {
		style = {},
		type = 'default',
		size = 'default',
		shape = 'default',
		children,
		href = '',
		htmlType = 'button',
		className = '',
		disabled,
		text,
		time = 0,
		icon = '',
		onClick = () => {},
		placeholder = '请输入值',
	} = props;
	/**
	 * 默认使用组件classname  参数className 覆盖默认样式
	 * 参数className > 默认使用组件classname > 参数样式
	 *
	 */
	const styleClassName: string = `${styles.ayongInput} ${className} ${
		styles[size]
	} ${styles[type]} ${styles[shape]}  ${disabled && styles.notAllowed} `;

	return <input className={styleClassName} placeholder={placeholder}></input>;
}
