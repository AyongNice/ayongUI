import React, {useEffect, useState} from 'react';
import drawerStyle from './index.module.less'
import Button from '../button/index.tsx'

const Drawer = ({
                  children,
                  open = false,
                  placement = 'bottom',
                  size = '380px',
                  onClose = () => {
                  },
                }) => {
  const [openWarp, setOpenWarp] = useState<boolean>(open);
  const [enter, setEnter] = useState<boolean>(open);
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
  return (

    <div className={`${drawerStyle.drawer} ${openWarp ? '' : drawerStyle.warpclose}`}>
      <div onClick={toggleDrawer}
           onAnimationEnd={onAnimationEnd}
           className={`${drawerStyle.make} ${openWarp ? drawerStyle.makeTram : ''}`}>
        <div onTransitionEnd={onTransitionEnd}
             className={`${drawerStyle.main}  ${enter ? `${drawerStyle.openmian} ${drawerStyle[placement]}` : drawerStyle[placement]}`}>
          <Button onClick={toggleDrawer}>Close</Button>
          {openWarp ? 1 : 0}
        </div>
      </div>

    </div>
  );
};

export default Drawer;
