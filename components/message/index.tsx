import React, {useState, isValidElement} from 'react';
import styleMessage from './index.module.less';
import {NotificationProps, NotificationState, MessageProps} from './index.d'
import {Type} from '../../config/coomm.d'; //公共类型
import {Wrong, Tick, Lament} from "../icon/icon.ts";
import ConditionalRender from "../conditional-render/conditional-render.tsx";
import './index.module.less';
import MountDom from "../mount-dom/index.ts"; //挂在dom公共方法


/**
 * Msa 组件显示
 * @param onAyongClose
 * @param icon
 * @param message
 * @param showClose
 * @param type
 * @param style
 * @param duration
 * @constructor
 */
const Notification: React.FC<NotificationProps> = ({
                                                     onAyongClose,
                                                     icon,
                                                     message,
                                                     showClose = false,
                                                     type,
                                                     style,
                                                     duration = 2
                                                   }: NotificationProps) => {
  const [show, setShow] = useState<boolean>(true);
  const onMessageClose = (): void => {
    setShow(false);
    onAyongClose();
  }

  const iconClassName: string = styleMessage[type as Type];
  const leftIcon = {
    info: React.createElement(Lament, {className: `${styleMessage.tag} ${iconClassName}`}),
    success: React.createElement(Tick, {className: `${styleMessage.tag} ${iconClassName}`}),
    warning: React.createElement(Lament, {className: `${styleMessage.tag} ${iconClassName}`}),
    error: React.createElement(Wrong, {className: `${styleMessage.tag} ${iconClassName}`}),
  }
  /**
   * onAnimationEnd 动画结束事件
   */
  return (
    <ConditionalRender mode='show' show={show}>
      <div
        style={{...style, zIndex: 1000, animationDuration: duration + 's'}}
        className={`${styleMessage.ayongMessage} ${iconClassName}`}
        onAnimationEnd={onAyongClose}
      >
        {icon ? React.createElement(icon.type, {className: `${styleMessage.tag} ${iconClassName}`}) : leftIcon[type as Type]}
        {message}
        {showClose &&
          <Wrong
            className={` ${styleMessage.close} ${iconClassName}`} onClick={onMessageClose}/>}
      </div>
    </ConditionalRender>

  );
};

const messageMode = {
  info: (props: MessageProps): void => {
    MountDom({element: Notification, ...props as MessageProps, type: 'info'});
  },
  success: (props: MessageProps) => {
    MountDom({element: Notification, ...props as MessageProps, type: 'success'});
  },
  warning: (props: MessageProps) => {
    MountDom({element: Notification, ...props as MessageProps, type: 'warning'});
  },
  error: (props: MessageProps) => {
    MountDom({element: Notification, ...props as MessageProps, type: 'error'});
  },
};

export default messageMode;
