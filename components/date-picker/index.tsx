import {useRef, useState} from "react";
import BaseCalendar from '../base-calendar/index.tsx'
import style from './index.module.less'

import {Doubleleft, Under, Doubleright} from '../icon/icon.ts'

const DatePicker = () => {
  const childRef = useRef(null);

  return <BaseCalendar ref={childRef} style={{width: '46px', height: '46px'}}
                       headerRender={({
                                        curYear,
                                        curMonth,
                                        yearOptions,
                                        monthOptions
                                      }) => {
                         return <main className={style.main}>
                           <div>
                             <Doubleleft onClick={() => childRef.current.prevYear()}
                                         className={style.icon}/>
                             <Under onClick={() => childRef.current.prevMonth()}
                                    className={`${style.spacing}  ${style.icon} `}/>
                           </div>
                           <div>
                             <span> {curYear}年 </span>
                             &nbsp;
                             <span>{curMonth + 1}月</span>
                           </div>
                           <div>
                             <Under onClick={() => childRef.current.nextMonth()}
                                    className={`${style.spacing}  ${style.icon} `}/>
                             <Doubleright onClick={() => childRef.current.nextYear()}
                                          className={style.icon}/>
                           </div>
                         </main>
                       }}/>
}
export default DatePicker
