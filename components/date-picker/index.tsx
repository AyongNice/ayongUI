/**
 * 组件设计
 *  类型 'quarter', 'month', 'year' 逻辑 UI在date-picker中
 *  类型 'day', 'week' 逻辑 UI在base-calendar中 (切换年份、月份调用base-calendar子组件方法)
 *
 */


import React, {useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import BaseCalendar from '../base-calendar/index.tsx';
import pickerStyle from './index.module.less';

import {Doubleleft, Under, Doubleright} from '../icon/icon.ts'
import ConditionalRender from '../conditional-render/conditional-render.tsx'
import {Collapse, Cendas, Left, Wrong, Facright} from '../icon/icon.ts'
import {DayItem, CalendarProps} from '.././base-calendar/index.d';
import SHM from '../s-h-m/index.tsx';
import globe from "../../config/style.module.less";

interface DateItem {

}

let yearDate: DateItem = [];
let monthDate: DateItem = [];
let quarterDate: DateItem = [];
const arr = [];
const obj = {};
const placeholder = {
  'day': '请选择日期',
  'week': '请选择周',
  'month': '请选择月份',
  'quarter': '请选择季度',
  'year': '请选择年份'
}
const DatePicker = React.forwardRef((props: CalendarProps, ref) => {

  const {
    style,
    className,
    picker = 'day',
    yearsRange = [1970, 2099],
    defaultValue = null,
    disabled = false,
    value = null,
    onChange = () => {
    },
    onClear = () => {

    },
    footerRender = null,
    showTime = false,
    isRange = false,
  } = props;
  let _defaultValue = '';
  let yyymmmddd = '';//年月日
  let ssshhhmmm = ''//时分秒
  let _value = '';//年月日
  let ssshhhmmmValue = ''//时分秒

  /** 默认值 **/
  if (defaultValue instanceof Date) {
    yyymmmddd = defaultValue.toISOString().slice(0, 10);
    if (showTime) {
      ssshhhmmm = defaultValue.toTimeString().slice(0, 8);
      _defaultValue = yyymmmddd + ' ' + ssshhhmmm
    } else {
      _defaultValue = yyymmmddd
    }
  }

  /** 父组件控制value值状态 **/

  if (value instanceof Date) {
    yyymmmddd = value.toISOString().slice(0, 10);
    if (showTime) {
      ssshhhmmm = value.toTimeString().slice(0, 8);
      _value = yyymmmddd + ' ' + ssshhhmmm
    } else {
      _value = yyymmmddd
    }
  }

  const childRef = useRef(null);

  const [selectDate, setSelectDate] = useState<Date | string>(_defaultValue)
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const [selectDateTemporary, setSelectDateTemporary] = useState<Date | string>('')

  const [clcikTarget, setClcikTarget] = useState<boolean>(true);
  //季度
  const [quarter, setQuarter] = useState<any>(0);
  //切换年份下标
  const [yearIndex, setYearIndex] = useState<number>(0);
  //年份源数据
  const [sourceData, setSourceData] = useState<number[]>([]);
  const [curYear, setCurYear] = useState<number>(new Date().getFullYear());

  const [timeDate, setTimeDate] = useState<string>('');

  const [showDownTime, setShowDownTime] = useState<boolean>(false)
  //使用useMemo优化
  const years = useMemo(() => {
    if (yearIndex < 0) return sourceData[0] || []
    if (yearIndex > sourceData.length - 1) return sourceData[sourceData.length - 1] || []
    return sourceData[yearIndex] || []
  }, [yearIndex])


  useEffect(() => {
    if (value) {
      childRef.current?.handleItemClick(null, {
        date: value.getDate().toString().padStart(2, '0'),
        comprehensiveStr: _value,
        comprehensive: value,
        isSelected: true,
        //判断value是否今年今天
        isToday: yyymmmddd === new Date().toISOString().slice(0, 10),
      }, 0, 0, true)
      setTimeDate(ssshhhmmm)
      setSelectDate(_value)
      childRef.current?.setCountYYYMMM({year: value.getFullYear(), month: value.getMonth()})
    }
  }, [value])

  useEffect(() => {
    if (defaultValue) {
      childRef.current?.handleItemClick(null, {
        date: defaultValue.getDate().toString().padStart(2, '0'),
        comprehensiveStr: _defaultValue,
        comprehensive: defaultValue,
        isSelected: true,
        isRangeSelected: true,
        isToday: true,
      }, 0, 0, true)
    }


    if (picker === 'month') {
      monthDate = [
        {value: '1月'},
        {value: '2月'},
        {value: '3月'},
        {value: '4月'},
        {value: '5月'},
        {value: '6月'},
        {value: '7月'},
        {value: '8月'},
        {value: '9月'},
        {value: '10月'},
        {value: '11月'},
        {value: '12月'},
      ]
    }

    if (picker === 'year') {
      yearDate = childRef.current.handleCreateDatePicker(yearsRange).years.slice(0, 58).map((item) => {
        return {value: item.label}
      })

      //处理yearDate 分成二维数组 每12个月一组 不足12个月的一组//还要定义一个对象 用来存储年份的索引

      for (let i = 0; i < yearDate.length; i++) {
        if (i % 12 == 0) {
          arr.push([])
        }
        arr[arr.length - 1].push(yearDate[i])
        obj[yearDate[i].value.replace('年', '')]
          = arr.length - 1
      }
      setYearIndex((prevState) => obj[curYear])
      setSourceData(arr)
    }


    if (picker === 'quarter') {
      quarterDate = [
        {value: 'Q1'},
        {value: 'Q2'},
        {value: 'Q3'},
        {value: 'Q4'},
      ]
    }
  }, [])


  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation()
      if (clcikTarget) {
        setIsDropdownVisible(false);
      }
      setClcikTarget(true)
    };
    if (isRange) return
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);

    };
  }, [clcikTarget])


  const openDropdown = (e) => {
    if (disabled) return
    setClcikTarget(false)
    setIsDropdownVisible(true)
  }
  const closeDropdown = (e) => {
    setIsDropdownVisible(false)
  }

  const onSelectChange = (e) => {
    setSelectDate(e.target.value)
  }
  const onWrong = (e) => {
    e?.stopPropagation()
    setSelectDate('')
    setSelectDateTemporary('')
    setTimeDate(() => '')
    onClear()
    childRef.current?.clearSetSelectedDates()
  }

  const _onChange = (item: DayItem, week) => {
    if (picker === 'week') {
      setSelectDate(week)
      setSelectDateTemporary(week)
      onChange(item, week)
    } else {
      if (showTime) {
        item.comprehensiveStr += " " + timeDate;
      }
      setSelectDate(item.comprehensiveStr)
      setSelectDateTemporary(item.comprehensiveStr)
      onChange(item)
    }
    if (isRange) return;
    setIsDropdownVisible(false)
  }
  /** 切换年份+ 切换年份区间 */
  const onYearNextChange = () => {
    if (picker === 'year') {
      childRef.current.toggleNextYear()
      return
    }
    childRef.current.nextYear()
  }

  const onYearPrevChange = () => {
    if (picker === 'year') {
      childRef.current.togglePrevYear()
      return
    }
    childRef.current.prevYear()
  }

  /**切换年份**/
  const toggleNextYear = () => {
    if (['month', 'quarter', 'day', 'week'].includes(picker)) {
      setCurYear(prevState => ++prevState)
    }
    if (['day', 'week'].includes(picker)) {
      childRef.current.nextYear()
    }
    if (picker !== 'year') return
    if (yearIndex > sourceData.length - 1) return
    setYearIndex((prevState) => ++prevState)
  }
  const togglePrevYear = () => {

    if (['month', 'quarter', 'day', 'week'].includes(picker)) {
      setCurYear(prevState => --prevState)
    }
    if (['day', 'week'].includes(picker)) {
      childRef.current.prevYear()
    }
    if (picker === 'year') {
      if (yearIndex < 0) return
      setYearIndex((prevState) => --prevState)
    }

  }
  const onSHMChange = (time) => {
    setTimeDate(time)
    setShowDownTime(false)
  }

  useImperativeHandle(ref, () => ({
    onWrong,
    openDropdown,
    closeDropdown
  }))

  return <div className={isRange ? '' : pickerStyle.warp}>
    {!isRange && <main
      style={style}
      className={`${pickerStyle.main} ${selectDate ? pickerStyle.hoverMain : ''} ${disabled ? globe.disabled : pickerStyle.mainHover} ${className} `}
      onClick={openDropdown}
    >
      <input value={selectDate}
             disabled={disabled}
             onChange={() => {
             }}
             placeholder={placeholder[picker]}
      />
      <Wrong
        onClick={onWrong}
        className={pickerStyle.pickerWrong}
      />
      <Cendas className={pickerStyle.pickerCollapse}/>
    </main>}
    <BaseCalendar
      className={`${isRange ? '' : pickerStyle.baseCalendarabsolute}  ${pickerStyle.baseCalendar} ${isDropdownVisible ? pickerStyle.baseCalendarShow : pickerStyle.baseCalendarNone}`}
      ref={childRef}
      {...props}
      selectedMode={picker}
      onChange={_onChange}
      style={{width: '32px', height: '32px'}}

      defaultValue={defaultValue}
      headerRender={({
                       curMonth,
                       yearOptions,
                       monthOptions,
                     }) => {
        return <div className={pickerStyle.tshanHien} style={{position: 'relative', marginBottom: ' 20px'}}>

          {showTime && <>
            <input className={pickerStyle.input}
                   value={timeDate}
                   onChange={() => {
                   }}
                   onFocus={() => setShowDownTime(true)}
                   placeholder='选择几点钟'/>
            <SHM onChange={onSHMChange}
                 value={ssshhhmmm}
                 onCancel={() => setShowDownTime(false)}
                 className={`${pickerStyle.SHM} ${showDownTime && pickerStyle.SHMShow}`}
                 defaultValue={ssshhhmmm}
            />
          </>}
          <main className={pickerStyle.picker}>
            <div>
              {['day', 'week', 'quarter', 'month', 'year'].includes(picker) &&
                <Doubleleft onClick={togglePrevYear}
                            className={pickerStyle.icon}/>}
              {['day', 'week'].includes(picker) && <Left onClick={() => childRef.current.prevMonth()}
                                                         className={`${pickerStyle.spacing}  ${pickerStyle.icon} `}/>}

            </div>
            <div>

              {picker === 'year' && <span>
                {years[0]?.value + '-' + years[years.length - 1]?.value}
            </span>}
              {['month', 'quarter', 'day', 'week'].includes(picker) && <span> {curYear}年 </span>
              }
              &nbsp;
              {picker === 'day' && <span>{curMonth + 1}月</span>}
            </div>
            <div>
              {['day', 'week'].includes(picker) && <Facright onClick={() => childRef.current.nextMonth()}
                                                             className={`${pickerStyle.spacing}  ${pickerStyle.icon} `}/>}

              {['day', 'week', 'quarter', 'month', 'year'].includes(picker) &&
                <Doubleright onClick={toggleNextYear}
                             className={pickerStyle.icon}/>}

            </div>
          </main>
        </div>
      }}
      dateRender={['quarter', 'month', 'year'].includes(picker) ? (item) => {
        return <React.Fragment>

          {'year' === picker && <main className='block-12'>
            {years.map((item, index) => {
              return <div key={index}
                          className={`block-chlid ${item.value === selectDate ? 'onSelect' : ''}`}
                          onClick={() => {
                            _onChange({comprehensiveStr: item.value})
                          }}>{item.value}</div>
            })}
          </main>
          }
          {'month' === picker && <main className='block-12'>
            {monthDate.map((item, index) => {
              return <div key={index}
                          className={`block-chlid ${curYear + '年' + item.value === selectDate ? 'onSelect' : ''}`}
                          onClick={() => {
                            _onChange({comprehensiveStr: curYear + '年' + item.value})
                          }}>{item.value}</div>
            })}
          </main>
          }
          {
            'quarter' === picker && <main className='block-4'>

              {quarterDate.map((item, index) => {
                return <div key={index}
                            className={`block-chlid ${item.value === selectDate ? 'onSelect' : ''}`}
                            onClick={() => {
                              _onChange({comprehensiveStr: item.value})
                            }}>{item.value}</div>
              })}
            </main>
          }

        </React.Fragment>

      } : null}
      footerRender={() => {
        return typeof footerRender === 'function' ? footerRender() : picker === 'day' &&
          <footer style={{position: 'relative', display: 'grid'}} className={pickerStyle.footer}
                  onClick={(event) => {
                    childRef.current.setDateSelected(new Date().toISOString().slice(0, 10))
                  }}>
            今天
          </footer>
      }}
    />

  </div>
})


export default DatePicker
