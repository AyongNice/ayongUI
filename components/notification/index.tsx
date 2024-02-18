import React, {useEffect, useState} from 'react';
import {NotificationProps} from './index.d';
import {Wrongs, Wrong, Lament, Illustrate, Tick} from '../icon/icon.ts'
import NotificationStyle from './index.module.less'
import {Type} from '../../config/coomm.d'; //公共类型
import MountDom from "../mount-dom/index.ts"; //挂在dom公共方法

const leftIcon: { [key: string]: React.FC } = {
  info: React.createElement(Illustrate, {className: `${NotificationStyle.iconSize} ${NotificationStyle.info}`}),
  success: React.createElement(Tick, {className: `${NotificationStyle.iconSize} ${NotificationStyle.success}`}),
  warning: React.createElement(Lament, {className: `${NotificationStyle.iconSize} ${NotificationStyle.warning}`}),
  error: React.createElement(Wrong, {className: `${NotificationStyle.iconSize} ${NotificationStyle.error}`}),
}
let time = 0;//计时器
const Component: React.FC<NotificationProps> = ({
                                                  open,
                                                  messages,
                                                  title,
                                                  zIndex,
                                                  closeIcon,
                                                  className,
                                                  style,
                                                  type,
                                                  placement = 'topRight',
                                                  duration = 3,
                                                  onClose = () => {
                                                  },
                                                  onAyongClose = () => {

                                                  }
                                                }) => {
  const [enter, setEnter] = useState<boolean>(false);
  console.log('Component', style, placement)
  const _style = {
    zIndex,
    ...style
  }
  const toggleDrawer = () => {
    setEnter(false)

  };

  const onTransitionEnd = (e) => {
    if (!Array.from(e.target.classList).includes(NotificationStyle.openmian)) {
      // onAyongClose()
    }
  }

  const onAnimationEnd = (e) => {
    setEnter(true)
  }
  const _onOk = () => {
    onAyongClose()
  }
  const _onCancel = () => {
    onAyongClose()
  }
  // ['top', 'bottom'].includes(placement) ? NotificationStyle.openMainAxis :
  return <div
    onAnimationEnd={onAnimationEnd}
    onTransitionEnd={onTransitionEnd}
    style={_style}
    onClick={(e) => e.stopPropagation()}
    className={` ${open ? NotificationStyle.makeTram : ''} ${NotificationStyle.main} ${NotificationStyle[placement]} ${enter ?  NotificationStyle.openMain : ''}`}>

    <header>
      {closeIcon ? React.createElement(closeIcon.type, {onClick: toggleDrawer}) : leftIcon[type as Type]}
      <h3 onClick={toggleDrawer}>{title}</h3>
      <Wrongs onClick={toggleDrawer}/>
    </header>
    <main className={className}>
      {messages}
    </main>

  </div>
}
const defaultPorps = {
  open: true,
  style: {
    width: '20%'
  },

}
const placementMap = {
  topRight: 'top',
  topLeft: 'top',
  bottomRight: 'bottom',
  bottomLeft: 'bottom',
  bottom: 'bottom',
  undefined: 'top'
}
const Notification = {
  info: (props: NotificationProps) => {
    MountDom({
      element: (data: NotificationProps) => <Component {...data}/>,
      ...defaultPorps,
      ...props as NotificationProps,
      YAxisPlacement: placementMap[props.placement],
      type: 'info',

    });
  },
  success: (props: NotificationProps) => {
    MountDom({
      element: (data: NotificationProps) => <Component {...data}/>,
      ...defaultPorps,
      ...props,
      type: 'success',
      YAxisPlacement: placementMap[props.placement],
    });
  },
  warning: (props: NotificationProps) => {
    MountDom({
      element: (data: NotificationProps) => <Component {...data}/>,
      ...defaultPorps,
      ...props,
      type: 'warning',
      YAxisPlacement: placementMap[props.placement],
    });
  },
  error: (props: NotificationProps) => {
    MountDom({
      element: (data: NotificationProps) => <Component {...data}/>,
      ...defaultPorps,
      ...props,
      type: 'error',
      YAxisPlacement: placementMap[props.placement],
    });
  }

}

export default Notification
