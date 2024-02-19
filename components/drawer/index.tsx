import React, {useEffect, useState} from 'react';
import drawerStyle from './index.module.less'
import Button from '../button/index.tsx';
import {Wrongs} from '../icon/icon.ts'
import {DrawerProps} from "./index.d";
import ReactDOM from 'react-dom';


const styletMap = {
  top: (size: string) => ({width: '100%', height: size}),
  bottom: (size: string) => ({width: '100%', height: size,}),
  right: (size: string) => ({width: size, height: '100%',}),
  left: (size: string) => ({width: size, height: '100%',}),
}


const Component: React.FC<DrawerProps> = ({
                                            children,
                                            title,
                                            closeIcon,
                                            zIndex = 999,
                                            getContainer = true,
                                            headerClassName = '',
                                            bodyClassName = '',
                                            makeClassName = '',
                                            open = false,
                                            placement = 'bottom',
                                            size = '380px',
                                            maskClosable = true,
                                            onClose = () => {
                                            },
                                            mainRender = null,
                                            headerRender = null
                                          } = {}) => {
  const [openWarp, setOpenWarp] = useState<boolean>(open);
  const [enter, setEnter] = useState<boolean>(open);
  let _maskClosable = maskClosable
  const _style = {
    ...(zIndex ? {zIndex} : {}),
    ...(getContainer ? {} : {position: "absolute"})
  }

  const toggleDrawer = () => {
    onClose()
  };
  useEffect(() => {

    console.log('open', title, open)
    if (open) {
      setOpenWarp(true)
    }
    if (!open) {
      setTimeout(() => {
        setEnter(false)
      }, 500)
    }
  }, [open])

  const onTransitionEnd = (e) => {
    setOpenWarp(open)
  }

  const onAnimationEnd = (e) => {
    setEnter(true)
  }


  return <div onClick={() => {
    _maskClosable && toggleDrawer()
  }}
              onAnimationEnd={onAnimationEnd}
              style={_style}
              className={`${openWarp ? drawerStyle.makeTram : drawerStyle.warpclose} ${drawerStyle.make} ${makeClassName} `}>
    <div onTransitionEnd={onTransitionEnd}
         style={styletMap[placement](size)}
         onClick={(e) => e.stopPropagation()}
         className={`${drawerStyle.main}  ${enter ? `${drawerStyle.openmian} ${drawerStyle[placement]}` : drawerStyle[placement]}`}>
      {typeof mainRender === 'function' ? mainRender() :
        <React.Fragment>
          {typeof headerRender === 'function' ? headerRender(toggleDrawer) : <header className={headerClassName}>

            {closeIcon ? React.createElement(closeIcon.type, {onClick: toggleDrawer}) :
              <Wrongs onClick={toggleDrawer}/>}
            <h3>{title}</h3>
          </header>}

          <main className={bodyClassName}>
            {children}
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

};

const Drawer: React.FC<DrawerProps> = (props) => {
  let _maskClosable = props.maskClosable;
  let _getContainer = props.getContainer
  React.Children.toArray(props.children).some(child => {

    if (child?.type?.displayName === 'Drawer') {
      _maskClosable = false;
      _getContainer = false;
    }
  });
  if (_getContainer) {
    return ReactDOM.createPortal(<Component
      {...props}
    >{props.children}</Component>, document.body)
  }
  return <Component    {...props} maskClosable={_maskClosable}>{props.children}</Component>

}
Drawer.displayName = 'Drawer'
export default Drawer;
