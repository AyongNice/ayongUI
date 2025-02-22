import React, {Fragment, useEffect, useRef, useState} from 'react';
import DatePicker from '../date-picker';
import Input from "../input/index.tsx";
import pickerStyle from './index.module.less'
import {Cendas, Swapright, Wrong} from '../icon/icon.ts';
import {DayItem, CalendarProps} from '.././base-calendar/index.d';
import SHM from '../s-h-m/index.tsx';
import Button from '../button/index.tsx';
import globe from "../../config/style.module.less";


/**
 * 日期范围选择器
 * @constructor
 */
const RangePicker = (props: CalendarProps) => {
  const {
    picker = 'day',
    yearsRange = [1970, 2099],
    className,
    disabled = false,
    onChange = () => {
    },
    onClear = () => {
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
  const [clcikTarget, setClcikTarget] = useState<boolean>(true);
  const [clcikTarget2, setClcikTarget2] = useState<boolean>(true);

  //聚集input 下划线方向
  const [foucsDirection, setFoucsDirection] = useState<string>('');


  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation()
      if (clcikTarget && clcikTarget2) {
        setIsDropdownVisible(false);
        setFoucsDirection('')
      }
      setClcikTarget(true)
      setClcikTarget2(true)
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);

    };
  }, [clcikTarget, clcikTarget2])


  const closeDropdown = () => {
    setIsDropdownVisible(false)
    start.current?.closeDropdown();
    end.current?.closeDropdown();
    setFoucsDirection('')
  }
  const openDropdown = (e) => {
    start.current?.openDropdown();
    end.current?.openDropdown();
    setIsDropdownVisible(true)
    setClcikTarget(false)
    setClcikTarget2(false)
  }

  const startChange = (data: DayItem, dateString) => {
    if (picker === 'week') {
      setStartValue(dateString)
    } else {
      setStartValue(data.comprehensiveStr)
    }
  }
  const endChange = (data: DayItem, dateString) => {
    if (picker === 'week') {
      setEndValue(dateString)
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
    end.current?.onWrong()
    start.current?.onWrong()
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
  const onSHMChange = (data: DayItem): void => {
    setTimeDate(data)
  }
  const onSure = (): void => {
    if (endValue && startValue) {
      closeDropdown();
      return
    }

    if (!startValue) setFoucsDirection('left')
    if (!endValue) setFoucsDirection('right')
  }
  const rightFocus = (): void => {
    if (disabled) return
    openDropdown()
    setFoucsDirection('right')

  }
  const leftFocus = (): void => {
    if (disabled) return
    openDropdown()
    setFoucsDirection('left')

  }
  return <div className={pickerStyle.warp}>
    <main
      className={`${pickerStyle.main}
      ${startValue && endValue ? pickerStyle.hoverMain : ''}
      ${foucsDirection && pickerStyle.hoverActive}
       ${foucsDirection && foucsDirection === 'left' ? pickerStyle.hoverActiveRight : pickerStyle.hoverActiveLeft}
      ${disabled ? globe.disabled : ''}
       ${className}
      `}
    >
      <Input style={{border: 'none'}} className={pickerStyle.startInput} disabled={disabled} value={startValue}
             onChange={() => {
             }} placeholder='请选择开始日期' onFocus={leftFocus}/>
      <Swapright className={pickerStyle.swapright}/>
      <Input style={{border: 'none'}} className={pickerStyle.startInput} disabled={disabled} value={endValue}
             onChange={() => {
             }} placeholder='请选择结束日期' onFocus={rightFocus}/>
      <div style={{
        width: '26px',
        height: '26px',
        display: 'flex',
        textAlign: 'center',
        alignItems: "center",
      }}>
        <Wrong
          onClick={onWrong}
          className={pickerStyle.pickerWrong}
        />
        <Cendas className={pickerStyle.pickerCollapse}/>
      </div>
    </main>

    <div
      className={`${pickerStyle.dropdown} ${isDropdownVisible ? pickerStyle.baseCalendarShow : pickerStyle.baseCalendarNone}`}>

      <div className={pickerStyle.transverseBox}>
        <DatePicker ref={start}
                    showTime={showTime}
                    onChange={startChange}
                    picker={picker}
                    yearsRange={yearsRange}
                    footerRender={() => {
                    }}
                    rangMode='rangbefore'
                    isRange/>
        <DatePicker ref={end}
                    showTime={showTime}
                    picker={picker}
                    yearsRange={yearsRange}
                    footerRender={() => {
                    }}
                    onChange={endChange}
                    rangMode='rangeafter'
                    isRange/>
      </div>

      <div style={{width: '100%', textAlign: 'right', padding: '0 6px 6px 0'}}>
        <Button onClick={onSure} size='small'> 确定</Button>
      </div>

    </div>

  </div>


}


export default RangePicker
