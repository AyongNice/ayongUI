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
  const [openWarp, setOpenWarp] = useState<boolean>(open);
  const [enter, setEnter] = useState<boolean>(open);
  const _style = {
    zIndex,
    ...style
  }
  console.log(`onAyongClose.${onAyongClose}`)
  const toggleDrawer = () => {
    onClose()
    onAyongClose()
  };
  useEffect(() => {
    if (open) {
      setOpenWarp(true)
    }
    if (!open) {
      clearTimeout(time)
      time = setTimeout(() => {
        setEnter(false);
      }, 500)
    }
  }, [open])

  const onTransitionEnd = (e) => {
    setOpenWarp(open)
    setEnter(true)
  }

  const onAnimationEnd = (e) => {

  }
  const _onOk = () => {
    onAyongClose()
  }
  const _onCancel = () => {
    onAyongClose()
  }
  return <div
    onAnimationEnd={onAnimationEnd}
    onTransitionEnd={onTransitionEnd}
    style={_style}
    onClick={(e) => e.stopPropagation()}
    className={`${NotificationStyle.main}  ${enter ? `${NotificationStyle.openmian} ${NotificationStyle[placement]}` : NotificationStyle[placement]}`}>

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
const Notification = {
  info: (props: NotificationProps) => {
    MountDom({
      element: (data: NotificationProps) => <Component {...data}/>, ...defaultPorps, ...props as NotificationProps,
      type: 'info'
    });
  },
  success: (props: NotificationProps) => {
    MountDom({
      element: (data: NotificationProps) => <Component {...data}/>,
      ...defaultPorps,
      ...props,
      type: 'success',

    });
  },
  warning: (props: NotificationProps) => {
    MountDom({
      element: (data: NotificationProps) => <Component {...data}/>,
      ...defaultPorps,
      ...props,
      type: 'warning',
    });
  },
  error: (props: NotificationProps) => {
    MountDom({
      element: (data: NotificationProps) => <Component {...data}/>,
      ...defaultPorps,
      ...props,
      type: 'error',

    });
  }

}

export default Notification
