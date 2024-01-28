import React, {Fragment, useEffect, useRef, useState} from 'react';
import DatePicker from '../date-picker';
import Input from "../input/index.tsx";
import pickerStyle from './index.module.less'
import {Cendas, Swapright, Wrong} from '../icon/icon.ts';
import {DayItem, DatePickerProps} from '.././date-picker/index.d';
import SHM from '../s-h-m/index.tsx';
import Button from '../button/index.tsx'

/**
 * 日期范围选择器
 * @constructor
 */
const RangePicker = (props: DatePickerProps) => {
  const {
    picker = 'day',
    yearsRange = [1970, 2099],
    onChange = () => {
    },
    onClear = () => {
    },
    onMonthChange = () => {

    },
    showTime = false
  } = props;

  const start = useRef(null);
  const end = useRef(null);

  const [startValue, setStartValue] = useState<string>('')
  const [endValue, setEndValue] = useState<string>('')

  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)

  const [selectedHour, setSelectedHour] = useState();
  const [selectedMinute, setSelectedMinute] = useState();
  const [selectedSecond, setSelectedSecond] = useState();


  const startFocus = () => {
    openDropdown()
  }

  const closeDropdown = () => {
    setIsDropdownVisible(false)
    start.current?.closeDropdown();
    end.current?.closeDropdown();
  }
  const openDropdown = () => {
    start.current?.openDropdown();
    end.current?.openDropdown();
    setIsDropdownVisible(true)
  }

  const startChange = (data) => {
    setStartValue(() => data.comprehensiveStr)
  }
  const endChange = (data) => {
    setEndValue(data.comprehensiveStr)
  }

  useEffect(() => {
    if (startValue && endValue) {
      if (showTime) {
        const shm: string = selectedHour + '-' + selectedMinute + '-' + selectedSecond
        onChange([startValue + selectedHour + shm, endValue + shm]);
      } else {
        onChange([startValue, endValue])
      }
      closeDropdown();
    }
  }, [startValue, endValue])
  const endFocus = () => {


  }
  const onWrong = (e) => {
    e.stopPropagation()
    setStartValue('')
    setEndValue('')
    end.current?.clearSetSelectedDates()
    start.current?.clearSetSelectedDates()
    onClear()
  }
  const onSelectChange = () => {

  }
  /**
   * 时分秒改变
   * @param selectedHour
   * @param selectedMinute
   * @param selectedSecond
   */
  const onSHMChange = ({selectedHour, selectedMinute, selectedSecond}) => {

  }
  return <div className={pickerStyle.warp}>
    <main className={`${pickerStyle.main} ${startValue && endValue ? pickerStyle.hoverMain : ''}`}
    >
      <Input className={pickerStyle.startInput} value={startValue} placeholder='请选择开始日期' onFocus={openDropdown}/>
      <Swapright className={pickerStyle.swapright}/>

      <input value={endValue}
             className={pickerStyle.startInput}
             onChange={() => {
             }}
             onFocus={openDropdown}
             placeholder='请选择结束日期'
      />
      <Wrong
        onClick={onWrong}
        className={pickerStyle.pickerWrong}
      />
      <Cendas className={pickerStyle.pickerCollapse}/>
    </main>

    <div
      className={`${pickerStyle.dropdown} ${isDropdownVisible ? pickerStyle.baseCalendarShow : pickerStyle.baseCalendarNone}`}>
      <DatePicker ref={start}
                  onChange={startChange}
                  footerRender={() => {
                  }}
                  rangMode='rangbefore'
                  isRange/>
      <DatePicker ref={end}
                  footerRender={() => {
                    return <Button onClick={closeDropdown} size='small'> 确定</Button>
                  }}
                  onChange={endChange}
                  rangMode='rangeafter'
                  isRange/>
      {showTime && <SHM onChange={onSHMChange}
                        selectedHourProp={selectedHour}
                        selectedMinuteProp={selectedMinute}
                        selectedSecond={selectedSecond}
      />}
    </div>

  </div>


}


export default RangePicker
