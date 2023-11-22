export function generatePointsFromPlacement(placement: string): string[] {
	switch (placement) {
		case 'top':
			return ['bc', 'tc'];
		case 'topLeft':
			return ['br', 'tc'];
		case 'topRight':
			return ['bl', 'tc'];
		case 'bottom':
			return ['tc', 'bc'];
		case 'bottomLeft':
			return ['tr', 'bc'];
		case 'bottomRight':
			return ['tl', 'bc'];
		case 'leftTop':
			return ['cc', 'cc'];
		case 'left':
			return ['cc', 'cc'];
		case 'leftBottom':
			return ['cc', 'cc'];
		case 'rightTop':
			return ['cc', 'cc'];
		case 'right':
			return ['cc', 'cc'];
		case 'rightBottom':
			return ['cc', 'cc'];
		default:
			return [];
	}
}

// 根据传入的dom元素和placement得出offset偏移量
export function getOffsetByPlacement(
	placement?: string,
	width?: number,
	height?: number,
	anotherX?: number,
	anotherY?: number
): number[] {
	let offsetX: number = 0;
	let offsetY: number = 0;
	if (placement) {
		switch (placement) {
			case 'topLeft':
				offsetX = -anotherX / 2;
				break;
			case 'topRight':
				offsetX = anotherX / 2;
				break;
			case 'bottomLeft':
				offsetX = -anotherX / 2;
				break;
			case 'bottomRight':
				offsetX = anotherX / 2;
				break;
			case 'left':
				offsetX = -width / 2 - anotherX / 2;
				break;
			case 'right':
				offsetX = width / 2 + anotherX / 2;
				break;
			case 'leftTop':
				offsetX = -width / 2 - anotherX / 2;
				offsetY = -height / 2 - anotherY / 2;
				break;
			case 'leftBottom':
				offsetX = -width / 2 - anotherX / 2;
				offsetY = height / 2 + anotherY / 2;
				break;
			case 'rightTop':
				offsetX = width / 2 + anotherX / 2;
				offsetY = -height / 2 - anotherY / 2;
				break;
			case 'rightBottom':
				offsetX = width / 2 + anotherX / 2;
				offsetY = height / 2 + anotherY / 2;
				break;
		}
		return [offsetX, offsetY];
	}
}
