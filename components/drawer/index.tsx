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
                                            zIndex,
                                            targetNode = {},
                                            getContainer = true,
                                            headerCalssName = '',
                                            bodyClassName = '',
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
  const _style = {
    ...(zIndex ? {zIndex} : {}),
    ...(getContainer ? {} : {position: "absolute"})
  }
  useEffect(() => {
    console.log('useEffect', targetNode)
  }, [])
  const toggleDrawer = () => {
    onClose()
  };
  useEffect(() => {
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
    setOpenWarp(e.target.className.includes(drawerStyle.openmian))
  }

  const onAnimationEnd = (e) => {
    setEnter(true)
  }


  return <div onClick={() => {
    maskClosable && toggleDrawer()
  }}
              onAnimationEnd={onAnimationEnd}
              style={_style}
              className={`${openWarp ? '' : drawerStyle.warpclose} ${drawerStyle.make}  ${openWarp ? drawerStyle.makeTram : ''}`}>
    <div onTransitionEnd={onTransitionEnd}
         style={styletMap[placement](size)}
         className={`${drawerStyle.main}  ${enter ? `${drawerStyle.openmian} ${drawerStyle[placement]}` : drawerStyle[placement]}`}>
      {typeof mainRender === 'function' ? mainRender() :
        <React.Fragment>
          {typeof headerRender === 'function' ? headerRender(toggleDrawer) : <header className={headerCalssName}>
            <Wrongs onClick={toggleDrawer}/>
            <h3>{title}</h3>
          </header>}

          <main className={bodyClassName}>
            {children}
          </main>

        </React.Fragment>
      }

    </div>
  </div>

};

const Drawer: React.FC<DrawerProps> = (props) => {

  if (props.getContainer) {
    return ReactDOM.createPortal(<Component
      {...props}
    >{props.children}</Component>, document.body)
  }
  return <Component    {...props}>{props.children}</Component>

}

export default Drawer;
