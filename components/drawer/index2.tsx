import React, {useEffect, useMemo, useState} from "react";
import {DrawerProps} from "./index.d";
import drawerStyle from "./index.module.less";
import directionenter from "../style-animation/directionenter.module.less";
import directionout from '../style-animation/directionout.module.less'

console.log('directionenter', directionenter)
console.log('directionout', directionout)

const placementMap = {
  top: (size: string) => ({top: 0, right: 0, width: '100%', height: size}),
  bottom: (size: string) => ({bottom: 0, left: 0, width: '100%', height: size,}),
  right: (size: string) => ({top: 0, right: 0, width: size, height: '100%',}),
  left: (size: string) => ({top: 0, left: 0, width: size, height: '100%',}),
}


const Drawer: React.FC<DrawerProps> = ({
                                         children,
                                         open = false,
                                         placement = 'right',
                                         size = '380px',
                                         onClose = () => {
                                         },

                                       }) => {

  useEffect(() => {
    console.log('open', open)
  }, [open])
  //动画

  const onMake = () => {
    onClose()
  }
  const onAnimationEnd = (e) => {
    console.log(e)
  }
  const pumping = useMemo(() => {
    return open ? directionenter[placement] : ''
  }, [open])

  return (

    <div className={`${drawerStyle.warp} `}>
      <div onClick={onMake} className={`${drawerStyle.make} ${open ? '' : drawerStyle.close}`}></div>
      <main
        className={`${drawerStyle.main} ${pumping}`}
        style={placementMap[placement](size)}
        onAnimationEnd={onAnimationEnd}

      >
        {pumping}
        {children}
      </main>
    </div>
  )
}

export default Drawer;
