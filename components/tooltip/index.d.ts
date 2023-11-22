import React from 'react';

// export interface TooltipProps {
// 	title?: string;
// 	/** 是否显示箭头 */
// 	arrow?: boolean;
// 	/** 主题风格 */
// 	theme?: 'light' | 'dark';
// 	/** 弹出层 */
// 	popup: ReactNode;
// 	/** 弹出层类名 */
// 	popupClassName?: string;
// 	/** 弹出层方向，默认左上 */
// 	placement?: string;
// 	/** 自定义样式 */
// 	customStyle?: {
// 		/** 弹出层外层 padding */
// 		popupWrapperPadding?: string;
// 	};
// 	visible?: boolean;
// 	/** children */
// 	children?: any;
// }

// export interface ClientRect {
// 	x: number;
// 	y: number;
// 	width: number;
// 	height: number;
// 	top: number;
// 	right: number;
// 	bottom: number;
// 	left: number;
// }

export interface TooltipProps {
	title?: string;
	style?: React.CSSProperties; // 自定义样式
	time?: number; // 防抖时间设置 0 为不防抖
	href?: string; // 跳转连接
	className?: string; // 自定义样式类名
	children: React.ReactNode; // 按钮内容
	disabled?: boolean; // 禁用
	icon?: React.ReactElement; // icon图标
	type?: 'primary' | 'default' | 'dashed'; // 按钮类型 利用样式实现
	size?: 'large' | 'default' | 'small'; // 按钮大小 利用样式padding 实现
	shape?: 'circle' | 'default' | 'round'; // 按钮形状 利用样式border-radius 实现
	htmlType?: 'button' | 'submit' | 'reset'; // 原生button类型
	onClick?: () => void; // 点击事件
	arrow?: boolean;
	trigger?: 'hover' | 'click' | 'focus';
	placement?:
		| 'topLeft'
		| 'top'
		| 'topRight'
		| 'bottomLeft'
		| 'bottom'
		| 'bottomRight'
		| 'leftTop'
		| 'left'
		| 'leftBottom'
		| 'rightTop'
		| 'right'
		| 'rightBottom';
	popup?: React.ReactNode;
}

declare const ToolTip: React.FC<TooltipProps>;

export default ToolTip;
