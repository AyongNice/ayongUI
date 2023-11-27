import Trigger from './components/trigger/trigger.tsx';
import { TooltipProps } from './tooltip.d.ts';
import toolTip from './tooltip.module.less';

const defaultPopup: React.FC = () => <span>defaultPopup</span>;

const Tooltip: React.FC<TooltipProps> = (props) => {
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
		trigger = ['hover'],
		placement = 'top',
		popup = defaultPopup,
	} = props;

	const styleClassName: string = `${toolTip.ayongTooltip} ${className} ${
		toolTip[size]
	} ${toolTip[type]} ${toolTip[shape]}  ${disabled && toolTip.notAllowed} `;
	return (
		<Trigger
			popup={popup}
			popupPlacement={placement}
			popupClassName={styleClassName}
			{...props}
		>
			{children}
		</Trigger>
	);
};

export default Tooltip;
