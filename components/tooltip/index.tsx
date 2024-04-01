import {useState} from 'react'
import { TooltipProps } from './tooltip.d.ts';
import styles from './tooltip.module.less';

const defaultPopup: React.FC = () => <span>defaultPopup</span>;

const Tooltip: React.FC<TooltipProps> = (props) => {
	const {
		style = {},
		type = 'default',
		size = 'default',
		shape = 'default',
		children,
		href = '',
		title,
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

	const styleClassName: string = `${styles.tooltipContainer}  ${styles[size]} ${styles[type]} ${disabled && styles.notAllowed} ${className} `;
	const [showTooltip, setShowTooltip] = useState(false);

	const handleMouseEnter = () => {
	  setShowTooltip(true);
	};
  
	const handleMouseLeave = () => {
	  setShowTooltip(false);
	};
  
	const getTooltipStyle = () => {
	  switch (placement) {
		case 'top':
		  return { top: '-30px', left: '50%', transform: 'translateX(-50%)' };
		case 'bottom':
		  return { bottom: '-30px', left: '50%', transform: 'translateX(-50%)' };
		case 'left':
		  return { top: '50%', left: '-110px', transform: 'translateY(-50%)' };
		case 'right':
		  return { top: '50%', right: '-110px', transform: 'translateY(-50%)' };
		default:
		  return { top: '-30px', left: '50%', transform: 'translateX(-50%)' };
	  }
	};
  
	return (
	  <div className={styleClassName} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
		{children}
		{showTooltip &&  <div className={`${styles.tooltip} ${placement}`} style={getTooltipStyle()}>
			{title}
		  </div>}
	  </div>
	);
};

export default Tooltip;
