import React, { ReactNode, useState, useRef, useLayoutEffect } from 'react';
import RcTrigger from 'rc-trigger';
import 'rc-trigger/assets/index.css';
import { TooltipProps } from './index.d.ts';
import toolTip from './index.module.less';
// import domAlign from 'dom-align';
import {
	generatePointsFromPlacement,
	getOffsetByPlacement,
} from './switchPos.ts';

const defaultPopup: React.FC = () => <span>defaultPopup</span>;

const Tooltip: React.FC<TooltipProps> = (props: TooltipProps) => {
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
		popup = defaultPopup,
		trigger = ['hover'],
		placement = 'bottom',
	} = props;

	const [visible, setVisible] = useState(false);
	const [offsetA, setOffsetA] = useState([0, 0]);
	const childrenRef = useRef<HTMLDivElement>(null);

	const handleVisibleChange = (newVisible: boolean) => {
		setVisible(newVisible);
	};

	const pointsA = generatePointsFromPlacement(placement);

	const getPopupContainer = (triggerNode: HTMLElement) => {
		return triggerNode;
	};

	const onPopupAlign = (domNode: HTMLElement, align: any) => {
		const offsetWidth = domNode.offsetWidth;
		const offsetHeight = domNode.offsetHeight;
		const { offsetWidth: anotherX, offsetHeight: anotherY } =
			childrenRef.current;
		const newOffset = getOffsetByPlacement(
			placement,
			offsetWidth,
			offsetHeight,
			anotherX,
			anotherY
		);
		setOffsetA(newOffset);
	};

	useLayoutEffect(() => {}, []);

	const styleClassName: string = `${toolTip.ayongTooltip} ${className} ${
		toolTip[size]
	} ${toolTip[type]} ${toolTip[shape]}  ${disabled && toolTip.notAllowed} `;
	return (
		<RcTrigger
			popupPlacement={placement}
			action={trigger}
			popupTransitionName={null}
			popupVisible={popup == null ? false : visible}
			popup={popup}
			onPopupVisibleChange={handleVisibleChange}
			popupClassName={styleClassName}
			popupAlign={{
				points: pointsA,
				offset: offsetA,
				useCssTransform: false,
			}}
			getPopupContainer={getPopupContainer}
			onPopupAlign={onPopupAlign}
		>
			<div
				ref={childrenRef}
				style={{
					width: 'max-content',
					height: 'max-content',
				}}
			>
				{children}
			</div>
		</RcTrigger>
	);
};

export default Tooltip;
