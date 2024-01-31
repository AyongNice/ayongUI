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

  //下拉框
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)

//时分秒数据
  const [timeDate, setTimeDate] = useState({});

  //是否点击input框
  const [clcikTarget, setClcikTarget] = useState<boolean>(false);

  //聚集input方向
  const [foucsDirection, setFoucsDirection] = useState<string>('');

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation()
      if (clcikTarget) {
        setIsDropdownVisible(false);
      }
      setClcikTarget(true)
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);

    };
  }, [])


  const closeDropdown = () => {
    setIsDropdownVisible(false)
    start.current?.closeDropdown();
    end.current?.closeDropdown();
    setFoucsDirection('')
  }
  const openDropdown = (e) => {
    console.log('openDropdown', e)
    start.current?.openDropdown();
    end.current?.openDropdown();
    setIsDropdownVisible(true)
    // setClcikTarget(false)
  }

  const startChange = (data) => {
    if (showTime) {
      const shm: string = timeDate.selectedHour + ':' + timeDate.selectedMinute + ':' + timeDate.selectedSecond;
      setStartValue(() => data.comprehensiveStr + ' ' + shm)
    } else {
      setStartValue(() => data.comprehensiveStr)

    }
  }
  const endChange = (data) => {

    if (showTime) {
      const shm: string = timeDate.selectedHour + ':' + timeDate.selectedMinute + ':' + timeDate.selectedSecond;

      setEndValue(data.comprehensiveStr + ' ' + shm)
    } else {
      setEndValue(data.comprehensiveStr)
    }
  }

  useEffect(() => {

    if (startValue && endValue) {
      onChange([startValue, endValue])
      closeDropdown();
    }
  }, [startValue, endValue])

  const onWrong = (e) => {
    e.stopPropagation()
    setStartValue('')
    setEndValue('')
    end.current?.clearSetSelectedDates()
    start.current?.clearSetSelectedDates()
    onClear()
    setFoucsDirection('')
    setTimeDate(() => ({
      selectedHour: '',
      selectedMinute: '',
      selectedSecond: ''
    }))
  }

  /**
   * 时分秒改变
   * @param selectedHour
   * @param selectedMinute
   * @param selectedSecond
   */
  const onSHMChange = (data) => {
    setTimeDate(data)
  }
  const onSure = () => {
    if (endValue && startValue) {
      closeDropdown();

      return
    }

    if (!startValue) setFoucsDirection('left')
    if (!endValue) setFoucsDirection('right')
  }
  const rightFocus = () => {
    openDropdown()
    setFoucsDirection('right')

  }
  const leftFocus = () => {
    openDropdown()
    setFoucsDirection('left')

  }
  console.log(pickerStyle.startInput)
  return <div className={pickerStyle.warp}>
    <main
      className={`${pickerStyle.main}
      ${startValue && endValue ? pickerStyle.hoverMain : ''}
      ${foucsDirection && pickerStyle.hoverActive}
       ${foucsDirection && foucsDirection === 'left' ? pickerStyle.hoverActiveRight : pickerStyle.hoverActiveLeft}
      `}
    >
      <Input className={pickerStyle.startInput} value={startValue} placeholder='请选择开始日期' onFocus={leftFocus}/>
      <Swapright className={pickerStyle.swapright}/>

      <input value={endValue}
             className={pickerStyle.startInput}
             onChange={() => {
             }}
             onFocus={rightFocus}
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
                  showTime={showTime}
                  onChange={startChange}
                  footerRender={() => {
                  }}
                  rangMode='rangbefore'
                  isRange/>
      <DatePicker ref={end}
                  showTime={showTime}
                  footerRender={() => {
                    return <Button onClick={onSure} size='small'> 确定</Button>
                  }}
                  onChange={endChange}
                  rangMode='rangeafter'
                  isRange/>

    </div>

  </div>


}


export default RangePicker
