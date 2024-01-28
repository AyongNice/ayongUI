import React, {Fragment, useEffect, useRef, useState} from 'react';
import DatePicker from '../date-picker';
import Input from "../input/index.tsx";
import pickerStyle from './index.module.less'
import {Cendas, Swapright, Wrong} from '../icon/icon.ts'
// <Cendas/>
/**
 * 日期范围选择器
 * @constructor
 */
const RangePicker = () => {
  const start = useRef(null);
  const end = useRef(null);

  const [startValue, setStartValue] = useState<string>('')
  const [endValue, setEndValue] = useState<string>('')


  const startFocus = () => {
    openDropdown()
  }

  const closeDropdown = () => {
    start.current?.closeDropdown();
    end.current?.closeDropdown();
  }
  const openDropdown = () => {
    start.current?.openDropdown();
    end.current?.openDropdown();
  }

  const startChange = (data) => {
    setStartValue(() => data.comprehensiveStr)
  }
  const endChange = (data) => {
    setEndValue(data.comprehensiveStr)
  }

  useEffect(() => {
    if (startValue && endValue) {
      closeDropdown()
    }
    console.log(startValue, endValue)
  }, [startValue, endValue])
  const endFocus = () => {


  }
  const onWrong = (e) => {
    e.stopPropagation()

  }
  const onSelectChange = () => {

  }
  return <div className={pickerStyle.warp}>
    <main className={`${pickerStyle.main} ${startValue && endValue ? pickerStyle.hoverMain : ''}`}
    >
      <Input value={startValue} placeholder='请选择开始日期' onFocus={openDropdown}/>
      <Swapright className={pickerStyle.iconSize}/>

      <input value={endValue}
             onFocus={openDropdown}
             onChange={onSelectChange}
             placeholder='请选择结束日期'
      />
      <Wrong
        onClick={onWrong}
        className={pickerStyle.pickerWrong}
      />
      <Cendas className={pickerStyle.pickerCollapse}/>
    </main>

    <div className={pickerStyle.dropdown}>
      <DatePicker ref={start}
                  onChange={startChange}
                  rangMode='rangbefore'
                  isRange/>
      <DatePicker ref={end}
                  onChange={endChange}
                  rangMode='rangeafter'
                  isRange/>
    </div>

  </div>


}


export default RangePicker
