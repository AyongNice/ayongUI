import RcTrigger from 'rc-trigger';
import styles from './rc-trigger-wrap.module.less';

const RcTriggerWrap = (props: InputProps) => {
	const { className, popupClassName, trueClassName, ...rest } = props as any;
	const styleClassName: string = `${styles.ayongInput} ${className} ${
		styles[size]
	} ${styles[type]} ${styles[shape]}  ${disabled && styles.notAllowed} `;
	return (
		<RcTrigger
			className={styleClassName}
			popupClassName={classnames(className, popupClassName)}
			{...rest}
		/>
	);
};

import styled from '@emotion/styled';
export const PopoverWrap = styled(RcTriggerWrap)`
	color: red;
`;
