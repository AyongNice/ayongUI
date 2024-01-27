import {Fragment, useRef, useState} from 'react';
import DatePicker from '../date-picker';
import Input from "../input/index.tsx";
import pickerStyle from './index.module.less'
import {Cendas, Swapright} from '../icon/icon.ts'
// <Cendas/>
/**
 * 日期范围选择器
 * @constructor
 */
const RangePicker = () => {
  const start = useRef(null);
  const end = useRef(null);

  const [startValue, setStartValue] = useState()
  const [endValue, setEndValue] = useState()


  const startFocus = () => {
    start.current?.openDropdown();
    end.current?.openDropdown();
  }

  const startChange = (data) => {
    setStartValue(data.comprehensiveStr)
    console.log(startValue)

  }
  const endChange = (data) => {
    setEndValue(data.comprehensiveStr)
  }
  const endFocus = () => {


  }


  return <div className={pickerStyle.warp}>
    <main className={pickerStyle.main}>
      <Input value={startValue} placeholder='请选择开始日期' onFocus={startFocus}/>
      <Swapright/>
      <Input value={endValue} suffix={<Cendas/>} placeholder='请选择结束日期' onFocus={startFocus}/>
    </main>

    <div className={pickerStyle.dropdown}>
      <DatePicker ref={start} onChange={startChange} isRange/>
      <DatePicker ref={end} onChange={endChange} isRange/>
    </div>

  </div>


}


export default RangePicker
