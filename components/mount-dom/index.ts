import React, {isValidElement, DetailedReactHTMLElement, ReactNode, FunctionComponent, HTMLAttributes} from "react";
import {createRoot} from "react-dom/client";

import {MountProps} from './index.d';

let id = 'notification-portal'

//没有虚拟dom
const createNotificationPortal = async (make) => {
  const dom = document.getElementById(id);
  if (!dom) {
    const newPortalContainer = document.createElement('div');
    newPortalContainer.id = id;
    newPortalContainer.setAttribute('make', make);

    //
    //设置绝对定位样式
    newPortalContainer.style.position = 'absolute';
    newPortalContainer.style.zIndex = 1000;

    document.body.appendChild(newPortalContainer);

  } else {
    dom.setAttribute('make', make);
  }
};


const notificationState: MountProps[] = [];
const MountDom = (props: { onClose?: any; element?: any; style?: Object; YAxisPlacement?: string; }) => {
  const {YAxisPlacement = 'top'} = props;
  const make = props.placement || 'message';
  const baseHieght: number = props.baseHieght || 70
  createNotificationPortal(make);
  const portalContainer: HTMLElement | null = document.getElementById(id);
  if (!portalContainer) return;

  //浏览器渲染空闲时执行 浏览器没秒60帧
  window.requestIdleCallback(() => {
    const cloneNode: Node = portalContainer.cloneNode(true) as Node;
    portalContainer.setAttribute('make', '');
    portalContainer.appendChild(cloneNode);
    /**
     * 关闭通知
     */
    const onAyongClose = () => {
      portalContainer.removeChild(cloneNode);
      const index: number = notificationState.findIndex((item) => {
        return item.container === cloneNode
      });
      if (index !== -1) {
        notificationState.splice(index, 1); // 从状态数组中移除该通知
      }
      props.onClose && typeof props.onClose === 'function' && props.onClose()
    };
    const length = notificationState.filter(_ => _.container.getAttribute('make') === make).length
    console.log(length)

    const initialTop: number = length * baseHieght; // 设置初始top值，乘机基础高度根据需求调整
    console.log('initialTop', [YAxisPlacement])
    const notification: DetailedReactHTMLElement<any, HTMLElement> = React.createElement(props.element, {
      onAyongClose,
      ...props,
      style: {[YAxisPlacement]: initialTop + 'px', ...props.style},
    })

    const root = createRoot(cloneNode as HTMLElement);
    root.render(notification);

    notificationState.push({container: cloneNode, onAyongClose});
  });

};

export default MountDom
