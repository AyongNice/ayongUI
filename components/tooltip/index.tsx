import { useEffect, useMemo, useRef, useState } from 'react';
import { TooltipProps } from './index.d';
import styles from './tooltip.module.less';

const defaultPopup: React.FC = () => <span>defaultPopup</span>;

const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    children,
    open,
	style,
    size = 'default',
    color = 'var(--ayong-bolck)',
    arrow = true,
    title,
    className = '',
    disabled,
    whiteSpace = 'nowrap',
    width = 'max-width',
    placement = 'top',
	onOpenChange=()=>{}
  } = props;

  const styleClassName: string = `${styles.tooltipContainer}  ${
    styles[size]
  }  ${disabled && styles.notAllowed} ${className} `;
  const [showTooltip, setShowTooltip] = useState(open);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  useEffect(() => {
    setShowTooltip(open);
	onOpenChange(open)
  }, [open]);
  /**
   * 换行省略
   */
  const textStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: ' -webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
  };

  useEffect(() => {
    console.log(color);
  }, [color]);
  const textRef = useRef(null);

  const [textHegith, setTextHegith] = useState(36);
  const [textWidth, setTextWidth] = useState(36);

  // 在组件挂载后获取文本的高度
  useEffect(() => {
    if (textRef.current) {
      setTextHegith(textRef.current.offsetHeight);
      setTextWidth(textRef.current.offsetWidth);
      console.log(textRef.current.offsetWidth);
    }
  }, [textRef]);
  const getTop = useMemo(() => -40 - (textHegith - 36) + 'px', [textHegith]);

  const getLeft = useMemo(() => -textWidth - 10 + 'px', [textWidth]);
  const getTooltipStyle = () => {
    switch (placement) {
      case 'top':
        return {
          //   ...(ellipsis && textStyle),
          width,
          whiteSpace,
          background: color,
          top: getTop,
          left: '50%',
          transform: 'translateX(-50%)',
		  ...style
        };
      case 'bottom':
        return {
          //   ...(ellipsis && textStyle),
          width,
          whiteSpace,
          background: color,
          bottom: getTop,
          left: '50%',
          transform: 'translateX(-50%)',
		  ...style

        };
      case 'left':
        return {
          //   ...(ellipsis && textStyle),
          width,
          whiteSpace,
          background: color,
          top: '50%',
          left: getLeft,
          transform: 'translateY(-50%)',
		  ...style

        };
      case 'right':
        return {
          //   ...(ellipsis && textStyle),
          width,
          whiteSpace,
          background: color,
          top: '50%',
          right: getLeft,
          transform: 'translateY(-50%)',
		  ...style

        };
      default:
        return {
          //   ...(ellipsis && textStyle),
          width,
          whiteSpace,
          background: color,
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
		  ...style

        };
    }
  };
  const getArrowStyle = () => {
    switch (placement) {
      case 'top':
        return {
          borderColor: `${color} transparent transparent transparent`,
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom':
        return {
          borderColor: ` transparent transparent ${color} transparent`,
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          borderColor: ` transparent transparent  transparent ${color}`,
          top: '50%',
          right: '-8px',
          transform: 'translateY(-50%)',
        };
      case 'right':
        return {
          borderColor: ` transparent ${color} transparent  transparent `,
          top: '50%',
          left: '-8px',
          transform: 'translateY(-50%)',
        };
      default:
        return {
          borderColor: ` transparent ${color} transparent  transparent `,
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
        };
    }
  };

  return (
    <div
      className={styleClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {title && showTooltip && (
        <div
          ref={textRef}
          className={`${styles.tooltip} `}
          style={getTooltipStyle()}
        >
          {arrow && (
            <div
              className={`${styles.tooltipArrow} ${styles[placement]} `}
              style={getArrowStyle()}
            />
          )}
          {title}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
