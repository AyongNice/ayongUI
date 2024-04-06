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
	title?: string;//title为空 不显示
	style?: React.CSSProperties; // 自定义样式
	className?: string; // 自定义样式类名
	children: React.ReactNode; // 按钮内容
	disabled?: boolean; // 禁用
  width?: string; // 宽度
  color?: string; // 颜色
  whiteSpace?: 'normal' | 'nowrap'; // 换行
	arrow?: boolean;
  open?: boolean; //  是否打开, 默认false
  onOpenChange?: (open: boolean) => void; // 打开关闭回调
	placement?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right';
}

declare const ToolTip: React.FC<TooltipProps>;

export default ToolTip;
