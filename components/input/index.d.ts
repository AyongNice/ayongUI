import React, { ReactPropTypes } from 'react';
export interface InputProps {
	value: ReactPropTypes.string; // 默认值
	style?: React.CSSProperties; // 自定义样式
	className?: ReactPropTypes.string; // 自定义样式类名
	disabled?: ReactPropTypes.bool; // 禁用
	icon?: React.ReactElement; // icon图标
	size?: 'large' | 'normal' | 'small'; // 输入框尺寸，nora
	type?: 'text' | 'password' | 'textarea'; // 按钮类型：文本、密码、富文本、数字
	btnType?: 'primary' | 'default' | 'dashed'; // 按钮样式类型 利用样式实现
	placeholder?: ReactPropTypes.string; // 占位符
	onFocus?: ReactPropTypes.func; // 聚焦回调
	onBlur?: ReactPropTypes.func; // 失焦回调
	onKeyUp?: ReactPropTypes.func; // 键入回调
	onChange: ReactPropTypes.func; // 值变动回调
	prefix?: React.ReactElement | string; // 前缀
	suffix?: React.ReactElement | string; // 后缀
}

declare const Button: React.FC<InputProps>;

export default Button;
