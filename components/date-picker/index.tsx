import {useEffect, useRef, useState} from "react";
import BaseCalendar from '../base-calendar/index.tsx'
import pickerStyle from './index.module.less'

import {Doubleleft, Under, Doubleright} from '../icon/icon.ts'
import ConditionalRender from '../conditional-render/conditional-render.tsx'
import {Collapse, Wrong} from '../icon/icon.ts'
import {DayItem} from './index.d'

const DatePicker = (props) => {

  const {
    picker = 'day',

    onChange = () => {
    },
    onClear = () => {
    },
    onMonthChange = () => {

    }
  } = props
  const childRef = useRef(null);
  const placeholder = {
    'day': '请选择日期',
    'week': '请选择周',
    'month': '请选择月份',
    'quarter': '请选择季度',
    'year': '请选择年份'
  }

  const [selectDate, setSelectDate] = useState<Date | string>('')
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false)
  const [selectDateTemporary, setSelectDateTemporary] = useState<Date | string>('')

  const [clcikTarget, setClcikTarget] = useState<boolean>(true);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      e.stopPropagation()
      if (clcikTarget) {
        // setSelectDate(selectDateTemporary);
        // setSelectDateTemporary('')
        setIsDropdownVisible(false);
      }
      setClcikTarget(true)
    };
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);

    };
  }, [clcikTarget])

  const setDropdown = (e) => {
    setClcikTarget(false)
    setIsDropdownVisible(true)
  }
  const onSelectChange = (e) => {
    setSelectDate(e.target.value)

  }
  const onWrong = (e) => {
    e.stopPropagation()
    setSelectDate('')
    setSelectDateTemporary('')
    childRef.current.clearSetSelectedDates();

    onClear()
  }

  const _onChange = (item: DayItem, week) => {
    if (picker === 'week') {
      setSelectDate(week)
      setSelectDateTemporary(week)
      console.log('_onChange', selectDateTemporary)
      onChange(item, week)
    } else {
      setSelectDate(item.comprehensiveStr)
      setSelectDateTemporary(item.comprehensiveStr)
      onChange(item)
    }


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

  return <div className={pickerStyle.warp}>
    <main
      className={`${pickerStyle.main} ${selectDate ? pickerStyle.hoverMain : ''}`}
      onClick={setDropdown}
    >
      <input value={selectDate}
             onChange={onSelectChange}
             placeholder={placeholder[picker]}
      />
      <Wrong
        onClick={onWrong}
        className={pickerStyle.pickerWrong}
      />
      <Collapse className={pickerStyle.pickerCollapse}/>
    </main>
    <BaseCalendar
      className={`${pickerStyle.baseCalendar} ${isDropdownVisible ? pickerStyle.baseCalendarShow : pickerStyle.baseCalendarNone}`}
      ref={childRef}
      {...props}
      selectedMode={picker}
      onChange={_onChange}
      style={{width: '32px', height: '32px'}}
      headerRender={({
                       curYear,
                       curMonth,
                       yearOptions,
                       monthOptions,
                       years
                     }) => {
        return <main className={pickerStyle.picker}>
          <div>
            {['day', 'week', 'month', 'year'].includes(picker) && <Doubleleft onClick={onYearPrevChange}
                                                                              className={pickerStyle.icon}/>}
            {['day', 'week'].includes(picker) && <Under onClick={() => childRef.current.prevMonth()}
                                                        className={`${pickerStyle.spacing}  ${pickerStyle.icon} `}/>}

          </div>
          <div>

            {picker === 'year' ? <span>{years[0]?.value + '-' + years[years.length - 1]?.value}</span> :
              <span> {curYear}年 </span>}
            &nbsp;
            {picker === 'day' && <span>{curMonth + 1}月</span>}
          </div>
          <div>
            {['day', 'week'].includes(picker) && <Under onClick={() => childRef.current.nextMonth()}
                                                        className={`${pickerStyle.spacing}  ${pickerStyle.icon} `}/>}

            {['day', 'week', 'month', 'year'].includes(picker) && <Doubleright onClick={onYearNextChange}
                                                                               className={pickerStyle.icon}/>}

          </div>
        </main>
      }}
      footerRender={() => {
        return picker === 'day' && <footer onClick={(event) => {
          childRef.current.setDateSelected(new Date().toISOString().slice(0, 10))
        }}>
          今天
        </footer>
      }}
    />

  </div>
}
export default DatePicker
