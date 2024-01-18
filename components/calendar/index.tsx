import React, {useState, useRef, FC} from 'react';
import {CalendarProps} from './index.d'
import Select from '../select/index.tsx'
import './index.less'
import BaseCalendar from '../base-calendar/index.tsx'

const Calendar: FC<CalendarProps> = (porps) => {

  const {
    style,
    value,
    defaultValue = '',
    yearsRange = [1970, 2099],
    selectedMode = 'noSelect',
    startOfWeek,
    disabled = false,
    dayCellRender = null,
    dateSelected = () => {
    },
    onChange = (day) => {
    },

  } = porps;
  const cFormat: string = '{d}';
  const _style = {width: 120, height: 100, ...style}
  const _defaultValue = defaultValue.split('-');
  if (_defaultValue[1]) {//月份-1
    _defaultValue[1] = _defaultValue[1] - 1;
  }
  const childRef = useRef(null);
  /**
   * 月份选择
   * @param value
   */
  const onMonthOptionsChange = (value: string) => {
    childRef.current.handleGetDays(curYear, value - 1, startOfWeek!, cFormat);
  }
  /**
   * 年份选择
   * @param value
   */
  const onYearOptionsChange = (value: string) => {
    childRef.current.handleGetDays(value, curMonth - 1, startOfWeek!, cFormat);
  }
  const [yearOptions, setYearOptions] = useState<number[]>([]);

  const [monthOptions, setMonthOptions] = useState<string[]>([]);

  const [curYear, setCurYear] = useState<number>(Number(_defaultValue[0]) || new Date().getFullYear());
  const [curMonth, setCurMonth] = useState<number>(Number(_defaultValue[1]) || new Date().getMonth());
  return <BaseCalendar ref={childRef} {...porps} headerRender={() => {
    return <>
      <Select style={{width: 80, marginRight: '20px'}}
              value={curYear}
              defaultValue={curYear}
              options={yearOptions}
              onChange={onYearOptionsChange}/>

      <Select style={{width: 80, marginBottom: 20}}
              value={curMonth + 1}
              defaultValue={curMonth + 1}
              options={monthOptions}
              onChange={onMonthOptionsChange}/>
    </>
  }}/>
};

export default Calendar;
