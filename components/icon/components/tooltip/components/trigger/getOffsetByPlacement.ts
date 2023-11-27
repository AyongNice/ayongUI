import { TriggerWrapProps } from './trigger.d.ts';
export function getOffsetByPlacement(
	placement: TriggerWrapProps['popupPlacement'],
	offsetWidth: number,
	offsetHeight: number,
	triggerWidth: number,
	triggerHeight: number,
	xCompensate?: number | 10,
	yCompensate?: number | 10
): [number, number] {
	let left = 0;
	let top = 0;
	const xCompensateR = xCompensate || 10;
	const yCompensateR = yCompensate || 10;

	switch (placement) {
		case 'topLeft':
			left = -triggerWidth + xCompensateR;
			top = -triggerHeight;
			break;
		case 'top':
			left = -(triggerWidth - offsetWidth) / 2;
			top = -triggerHeight;
			break;
		case 'topRight':
			left = offsetWidth - xCompensateR;
			top = -triggerHeight;
			break;
		case 'bottomLeft':
			left = -triggerWidth + xCompensateR;
			top = offsetHeight;
			break;
		case 'bottom':
			left = -(triggerWidth - offsetWidth) / 2;
			top = offsetHeight;
			break;
		case 'bottomRight':
			left = offsetWidth - xCompensateR;
			top = offsetHeight;
			break;
		case 'leftTop':
			left = -triggerWidth;
			top = -triggerHeight + yCompensateR;
			break;
		case 'left':
			left = -triggerWidth;
			top = -(triggerHeight - offsetHeight) / 2;
			break;
		case 'leftBottom':
			left = -triggerWidth;
			top = offsetHeight - yCompensateR;
			break;
		case 'rightTop':
			left = offsetWidth;
			top = -triggerHeight + yCompensateR;
			break;
		case 'right':
			left = offsetWidth;
			top = -(triggerHeight - offsetHeight) / 2;
			break;
		case 'rightBottom':
			left = offsetWidth;
			top = offsetHeight - yCompensateR;
			break;
		default:
			break;
	}

	return [left, top];
}

export function getArrowPos(
	placement: TriggerWrapProps['popupPlacement'],
	offsetWidth: number,
	offsetHeight: number,
	triggerWidth: number,
	triggerHeight: number,
	arrowWidth: number,
	xCompensate?: number | 10,
	yCompensate?: number | 10
): [number, number] {
	let left = 0;
	let top = 0;
	let trans = '';
	const xCompensateR = xCompensate || 10;
	const yCompensateR = yCompensate || 10;

	switch (placement) {
		case 'topLeft':
			left = triggerWidth - xCompensateR - arrowWidth / 2;
			top = triggerHeight;
			break;
		case 'top':
			left = triggerWidth / 2 - arrowWidth / 2;
			top = triggerHeight;
			break;
		case 'topRight':
			left = xCompensateR - arrowWidth / 2;
			top = triggerHeight;
			break;
		case 'bottomLeft':
			left = triggerWidth - xCompensateR - arrowWidth / 2;
			top = -arrowWidth;
			trans = 'rotate(180deg)';
			break;
		case 'bottom':
			left = triggerWidth / 2 - arrowWidth / 2;
			top = -arrowWidth;
			trans = 'rotate(180deg)';
			break;
		case 'bottomRight':
			left = arrowWidth / 2;
			top = -arrowWidth;
			trans = 'rotate(180deg)';
			break;
		case 'leftTop':
			left = triggerWidth;
			top = triggerHeight - yCompensateR - arrowWidth / 2;
			trans = 'rotate(270deg)';
			break;
		case 'left':
			left = triggerWidth;
			top = triggerHeight / 2 - arrowWidth / 2;
			trans = 'rotate(270deg)';
			break;
		case 'leftBottom':
			left = triggerWidth;
			top = yCompensateR - arrowWidth / 2;
			trans = 'rotate(270deg)';
			break;
		case 'rightTop':
			left = -arrowWidth;
			top = triggerHeight - yCompensateR - arrowWidth / 2;
			trans = 'rotate(90deg)';
			break;
		case 'right':
			left = -arrowWidth;
			top = triggerHeight / 2 - arrowWidth / 2;
			trans = 'rotate(90deg)';
			break;
		case 'rightBottom':
			left = -arrowWidth;
			top = arrowWidth / 2;
			trans = 'rotate(90deg)';
			break;
		default:
			break;
	}

	return [left, top, trans];
}
