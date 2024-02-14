import React, {useEffect, useState} from "react";
import ModalStyle from './index.module.less'
import {Wrongs, Wrong, Lament, Illustrate, Tick} from '../icon/icon.ts'
import {ModalProps, ConfirmProps} from './index.d';
import Button from '../button/index.tsx';
import MountDom from "../mount-dom/index.ts"; //挂在dom公共方法
import ConditionalRender from "../conditional-render/conditional-render.tsx";

let time: number = 0;
const leftIcon: { [key: string]: React.FC } = {
  info: React.createElement(Illustrate, {className: `${ModalStyle.iconSize} ${ModalStyle.info}`}),
  success: React.createElement(Tick, {className: `${ModalStyle.iconSize} ${ModalStyle.success}`}),
  warning: React.createElement(Lament, {className: `${ModalStyle.iconSize} ${ModalStyle.warning}`}),
  error: React.createElement(Wrong, {className: `${ModalStyle.iconSize} ${ModalStyle.error}`}),
}
const Component: React.FC<ModalProps> = ({
                                           children,
                                           title,
                                           closeIcon,
                                           confirmLoading = false,
                                           zIndex = 999,
                                           style = {width: '50%'},
                                           headerClassName = '',
                                           bodyClassName = '',
                                           makeClassName = '',
                                           open = false,
                                           placement = 'top',
                                           maskClosable = true,
                                           type = '',
                                           content = '',
                                           okText = '',
                                           cancelText = '',
                                           onClose = () => {
                                           },
                                           onOk = () => {
                                           },
                                           onCancel = () => {
                                           },
                                           onAyongClose = () => {
                                           },
                                           footerRender = null,
                                           mainRender = null,
                                           headerRender = null
                                         }) => {
  const [openWarp, setOpenWarp] = useState<boolean>(open);
  const [enter, setEnter] = useState<boolean>(open);
  const [disabledDelay, setDisabledDelay] = useState<boolean>(confirmLoading);
  let _maskClosable = maskClosable
  const _style = {
    zIndex,
    ...style
  }
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
  useEffect(() => {
    if (confirmLoading) {
      setDisabledDelay(true)
    } else {
      // clearTimeout(time2)
      time = setTimeout(() => {
        setDisabledDelay(false)
      }, 500)
    }
  }, [confirmLoading])
  const onTransitionEnd = (e) => {
    setOpenWarp(open)
  }

  const onAnimationEnd = (e) => {
    setEnter(true)
  }
  const _onOk = () => {
    onOk()
    onAyongClose()
  }
  const _onCancel = () => {
    onCancel()
    onAyongClose()
  }
  return <div onClick={() => {
    _maskClosable && toggleDrawer()
  }}
              onAnimationEnd={onAnimationEnd}
              className={`${openWarp ? ModalStyle.makeTram : ModalStyle.warpclose} ${ModalStyle.make} ${makeClassName} `}>
    <div onTransitionEnd={onTransitionEnd}
         style={_style}
         onClick={(e) => e.stopPropagation()}
         className={`${ModalStyle.main}  ${enter ? `${ModalStyle.openmian} ${ModalStyle[placement]}` : ModalStyle[placement]}`}>
      {typeof mainRender === 'function' ? mainRender() :
        <React.Fragment>
          {typeof headerRender === 'function' ? headerRender(toggleDrawer) : <header className={headerClassName}>

            {closeIcon ? React.createElement(closeIcon.type, {onClick: toggleDrawer}) :
              leftIcon[type] || <Wrongs onClick={toggleDrawer}/>
            }
            <h3>{title}</h3>
          </header>}

          <main className={bodyClassName}>
            {content || children}
          </main>

          {typeof footerRender === 'function' ? footerRender() : <footer>
            <Button style={{marginRight: '15px'}} onClick={_onCancel}>{cancelText || '取消'}</Button>
            <Button type='primary' disabled={disabledDelay || confirmLoading} loading={confirmLoading}
                    onClick={_onOk}>{okText || '确定'}</Button>
          </footer>}


        </React.Fragment>
      }

    </div>
  </div>

}
const Confirm = (props) => <Component {...props}/>
const Modal = (props: ModalProps) => {
  return <Component {...props}/>
}
const style = {
  width: '30%', top: '100px'
}
const defaultPorps = {
  open: true,
  style: {
    width: '30%', top: '100px'
  },

}
Modal.info = (props: ConfirmProps): void => {
  MountDom({
    element: (data: ModalProps) => <Component {...data}/>, ...defaultPorps, ...props as ConfirmProps,
    type: 'info'
  });
}
Modal.success = (props: ModalProps) => {
  MountDom({
    element: (data: ModalProps) => <Component {...data}/>,
    ...defaultPorps,
    ...props,
    type: 'success',

  });
}
Modal.warning = (props: ModalProps) => {
  MountDom({
    element: (data: ModalProps) => <Component {...data}/>,
    ...defaultPorps,
    ...props,
    type: 'warning',
  });
}
Modal.error = (props: ModalProps) => {
  MountDom({
    element: (data: ModalProps) => <Component {...data}/>,
    ...defaultPorps,
    ...props,
    type: 'error',

  });
}
export default Modal;
