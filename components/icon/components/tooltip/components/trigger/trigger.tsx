import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

import { TriggerWrapProps } from './trigger.d.ts';

import { getOffsetByPlacement, getArrowPos } from './getOffsetByPlacement.ts';

const TriggerWrap: React.FC<TriggerWrapProps> = (props) => {
	const {
		popupPlacement,
		action = ['hover'],
		popupTransitionName,
		popupVisible,
		popup,
		// onPopupVisibleChange,
		popupClassName,
		popupAlign,
		getPopupContainer,
		onPopupAlign,
		children,
		arrowWidth = 5,
	} = props;
	const [visible, setVisible] = useState(popupVisible || false);
	const [offset, setOffset] = useState<[number, number]>([0, 0]);
	const triggerInnerRef = useRef<HTMLDivElement>(null);
	const triggerContentRef = useRef<HTMLDivElement>(null);

	const [arrowOffset, setArrowOffset] = useState<[number, number, string]>([
		0,
		0,
		'',
	]);

	useEffect(() => {
		setVisible(popupVisible || false);
	}, [popupVisible]);

	/* useLayoutEffect(() => {
		setTimeout(() => {
			setVisible(true);
			handlePopupAlign(
				triggerInnerRef.current!,
				triggerContentRef.current!,
				popupAlign
			);
		}, 10);
	}, []); */

	const handleVisibleChange = (newVisible: boolean) => {
		setVisible(newVisible);
		handlePopupAlign(
			triggerInnerRef.current!,
			triggerContentRef.current!,
			popupAlign
		);
	};

	const handlePopupAlign = (
		domNode: HTMLElement,
		triggerNode: HTMLElement,
		align: object
	) => {
		const offsetWidth = domNode.offsetWidth;
		const offsetHeight = domNode.offsetHeight;

		const triggerWidth = triggerNode.offsetWidth;
		const triggerHeight = triggerNode.offsetHeight;

		const newOffset = getOffsetByPlacement(
			popupPlacement,
			offsetWidth,
			offsetHeight,
			triggerWidth,
			triggerHeight
		);
		setOffset(newOffset);

		const arrowPos = getArrowPos(
			popupPlacement,
			offsetWidth,
			offsetHeight,
			triggerWidth,
			triggerHeight,
			arrowWidth * 2
		);
		setArrowOffset(arrowPos);

		if (onPopupAlign) {
			onPopupAlign(domNode, align);
		}
	};

	const handleMouseEnter = () => {
		if (action.includes('hover')) {
			handleVisibleChange(true);
		}
	};

	const handleMouseLeave = () => {
		if (action.includes('hover')) {
			handleVisibleChange(false);
		}
	};

	const handleClick = () => {
		if (action.includes('click')) {
			handleVisibleChange(!visible);
		}
	};

	return (
		<div
			ref={triggerInnerRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
			style={{
				position: 'relative',
				width: 'min-content',
				height: 'min-content',
			}}
		>
			{children}
			{
				<div
					ref={triggerContentRef}
					className={popupClassName}
					style={{
						position: visible ? 'absolute' : 'fixed',
						left: visible ? offset[0] : '-9999px',
						top: visible ? offset[1] : '-9999px',
						zIndex: 9999,
						visibility: visible ? 'visible' : 'hidden',
						transform: visible ? 'fade-in 2s' : 'fade-out 2s',
						whiteSpace: 'nowrap',
					}}
				>
					<div
						style={{
							position: 'absolute',
							width: '0',
							height: '0',
							left: visible ? arrowOffset[0] : '-9999px',
							top: visible ? arrowOffset[1] : '-9999px',
							zIndex: 9999,
							border: `${arrowWidth}px solid transparent`,
							borderTopColor: 'var(--ayong-tooltip-bg-color)',
							transform: arrowOffset[2],
							visibility: visible ? 'visible' : 'hidden',
						}}
					></div>
					{typeof popup === 'function' ? popup() : popup}
				</div>
			}
		</div>
	);
};

export default TriggerWrap;
