import React, {isValidElement, DetailedReactHTMLElement} from "react";
import {createRoot} from "react-dom/client";

import {MountProps} from './index.d';

//没有虚拟dom
const createNotificationPortal = () => {
  const dom = document.getElementById('notification-portal');
  if (!dom) {
    const newPortalContainer = document.createElement('div');
    newPortalContainer.id = 'notification-portal';
    //设置绝对定位样式
    newPortalContainer.style.position = 'absolute';
    newPortalContainer.style.zIndex = 1000;

    document.body.appendChild(newPortalContainer);
  }
};

createNotificationPortal();

const notificationState: MountProps[] = [];
const portalContainer: HTMLElement | null = document.getElementById('notification-portal');
const Index = (props) => {

  if (!portalContainer) return;
  //浏览器渲染空闲时执行 浏览器没秒60帧
  window.requestIdleCallback(() => {
    const cloneNode: Node = portalContainer.cloneNode(true) as Node;
    portalContainer.appendChild(cloneNode);
    /**
     * 关闭通知
     */
    const onAyongClose = () => {
      portalContainer.removeChild(cloneNode);
      const index: number = notificationState.findIndex((item) => item.container === cloneNode);
      if (index !== -1) {
        notificationState.splice(index, 1); // 从状态数组中移除该通知
      }
      props.onClose && typeof props.onClose === 'function' && props.onClose()
    };

    const initialTop: number = notificationState.length * 70; // 设置初始top值，根据需求调整
    console.log('initialTop', props)
    const notification: DetailedReactHTMLElement<React.FC, HTMLElement> = React.createElement(props.element, {
      onAyongClose,
      style: {top: initialTop + 'px'},
      ...props,
    })

    const root = createRoot(cloneNode as HTMLElement);
    root.render(notification);

    notificationState.push({container: cloneNode, onAyongClose});
  });

};

export default Index
