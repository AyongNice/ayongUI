/**
 * @file calendar
 * @description 日历组件 用于选择日期基础组件
 * @date 2020-09-21
 * @lastModify 2020-09-21
 */


import React, {useState, useMemo, useImperativeHandle, useRef, useEffect, FC, ReactNode} from 'react';
import {getDaysInMonth, handleCrateDate, handleCreateDatePicker, parseTime} from './utils.js';
import {CalendarProps, DayItem} from './index.d'
import Select from '../select/index.tsx'
import './index.less'
import {isValidDate} from "ayongUI/components/calendar/utils";
import {lightHover} from './hover.js';

import Table from '../table/index.tsx'

let monthDate = [];

let yearDate = [];
const arr = [];
const obj = {};


const Calendar: FC<CalendarProps> = React.forwardRef(({
                                                        style,
                                                        value,
                                                        className,
                                                        defaultValue = '',
                                                        yearsRange = [1970, 2099],
                                                        selectedMode = 'noSelect',
                                                        startOfWeek,
                                                        picker = 'day',
                                                        disabled = false,
                                                        dayCellRender = null,
                                                        dateRender = null,
                                                        dateSelected = () => {
                                                        },
                                                        onChange = (day) => {
                                                        },
                                                        curYearChange = () => {
                                                        },
                                                        curMonthChange = () => {
                                                        },
                                                        headerRender = null,
                                                        footerRender = null
                                                      }, ref) => {
      const cFormat: string = '{d}';
      const _style = {width: 120, height: 100, ...style}
      const _defaultValue = defaultValue.split('-');
      if (_defaultValue[1]) {//月份-1
        _defaultValue[1] = _defaultValue[1] - 1;
      }

      const [weeks, setWeeks] = useState<string[]>(['一', '二', '三', '四', '五', '六', '日']);
      const [curYear, setCurYear] = useState<number>(Number(_defaultValue[0]) || new Date().getFullYear());
      const [curMonth, setCurMonth] = useState<number>(Number(_defaultValue[1]) || new Date().getMonth());
      const [curDate] = useState<string>(parseTime(new Date().getTime()), cFormat);

      const [res, setRes] = useState<any[][]>([]);
      const [selectedDates, setSelectedDates] = useState<string[]>([]);

      /** 选定的周 **/
      const [weekRow, setWeekRow] = useState<number | null>(null);
      //切换年份下标
      const [yearIndex, setYearIndex] = useState<number>(0);
      //年份源数据
      const [sourceData, setSourceData] = useState<number[]>([]);

      //季度
      const [quarter, setQuarter] = useState<any>(0);

      useEffect(() => {
        setWeeks([...weeks.slice(startOfWeek! - 1), ...weeks.slice(0, startOfWeek! - 1)]);
        handleGetDays(curYear, curMonth, startOfWeek!, cFormat);
      }, [curYear, curMonth, defaultValue]);

      //使用useMemo优化
      const years = useMemo(() => {
        if (yearIndex < 0) return sourceData[0] || []
        if (yearIndex > sourceData.length - 1) return sourceData[sourceData.length - 1] || []
        return sourceData[yearIndex] || []
      }, [yearIndex])


      useEffect(() => {
        if (selectedMode === 'month') {
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

        if (selectedMode === 'year') {
          yearDate = handleCreateDatePicker(yearsRange).years.slice(0, 58).map((item) => {
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


      }, [])


      useEffect(() => {
        if (!isValidDate(value)) return;
        const _value = value.split('-');
        if (_value[0] < yearsRange[0] || _value[1] > yearsRange[1]) {
          return console.warn('超出日期范围')
        }
        handleGetDays(_value[0], _value[1] - 1, startOfWeek!, cFormat);
      }, [value])
      /**
       * 获取日期
       * @param year
       * @param month
       * @param startOfWeek
       * @param cFormat
       */
      const handleGetDays = async (year: number, month: number, startOfWeek: number, cFormat: string) => {

        const curDays = handleCrateDate({year, month, start: 1, end: getDaysInMonth(year, month), cFormat});

        const firstDayOfWeek: number = new Date(`${year}-${month + 1}-01`).getDay();
        const obj: Record<number, string> = {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 0: '日'};
        const firstDayInCN: string = obj[firstDayOfWeek];
        const index: number = weeks.indexOf(firstDayInCN);


        const newPrevDays = handleCrateDate({year, month, start: 1, end: index + 1, type: 'prev', cFormat});
        const newRearDays = handleCrateDate({
          year,
          month,
          start: 1,
          end: 42 - getDaysInMonth(year, month) - index,
          type: 'rear',
          cFormat
        });
        const newShowDays = [...newPrevDays, ...curDays, ...newRearDays];
        const newRes = handleFormatDates(newShowDays);

        setRes(newRes);


      };

      /**
       * 格式化日期
       * @param arr
       * @param size
       */
      const handleFormatDates = (arr: any[], size: number = 7): any[][] => {
        const arr2: any[][] = [];
        for (let i = 0; i < size; i++) {
          const temp = arr.slice(i * size, i * size + size);
          arr2.push(temp);
        }
        return arr2;
      };

      /** 同一年 下一月**/
      const nextMonth = () => {
        if (curMonth + 1 < 12) {
          setCurMonth(prevSate => {
            return prevSate + 1
          });
          handleGetDays(curYear, curMonth - 1, startOfWeek!, cFormat);
        } else {
          nextYear()
        }
      }

      /** 同一年 上一月**/
      const prevMonth = () => {
        if (curMonth > 0) {
          setCurMonth(prevSate => {
            return prevSate - 1
          });
          handleGetDays(curYear, curMonth - 1, startOfWeek!, cFormat);
        } else {
          prevYear()
        }
      }


      /** 下一年**/
      const nextYear = () => {

        setCurYear(prevSate => {
          return prevSate + 1
        });
        handleGetDays(curYear, curMonth - 1, startOfWeek!, cFormat);
        setCurMonth(0);
      }
      /** 上一年**/
      const prevYear = () => {

        setCurYear(prevSate => {
          return prevSate - 1
        });
        handleGetDays(curYear, curMonth - 1, startOfWeek!, cFormat);
        setCurMonth(0);
      }

      const setDateSelected = (date: string = '') => {
        const _date: string[] = date.split('-');
        const year: number = Number(_date[0]);
        const month: number = Number(_date[1]) - 1;
        setCurYear(year);
        setCurMonth(month);
        handleGetDays(year, month, startOfWeek!, cFormat);
      }


      /**
       * 点击日期
       * @param item
       * @param i
       * @param j
       */
      const handleItemClick = (item: DayItem, i: number, j: number) => {
        if (disabled) return;
        console.log('handleItemClick', item)
        if (selectedMode === 'week') {
          setWeekRow(i)
        }

        /** 点击上下月切换月份 **/
        if (selectedMode === 'noSelect') {
          const clickYaerItem = new Date(item.comprehensiveStr).getFullYear();

          if (clickYaerItem === curYear) { //同一年

            /** 同一年 上一月**/
            if (item.monthSortMode === 1) {
              console.log(1)
              prevMonth()
            }
            /** 同一年 下一月**/
            if (item.monthSortMode === 2 && curMonth <= 12) {
              console.log(2)

              nextMonth()
            }

          } else {
            /** 上一年**/
            if (clickYaerItem > curYear) {
              console.log(3)

              nextYear()

            }
            /** 下一年**/
            if (clickYaerItem < curYear) {
              console.log(4)

              prevYear()

            }

          }

        }

        if (selectedMode === 'multiple') {
          console.log(5)

          setRes((prevRes) => {
            const updatedRes = [...prevRes];
            updatedRes[i][j].isSelected = !updatedRes[i][j].isSelected;
            if (updatedRes[i][j].isSelected) {
              setSelectedDates((prevSelectedDates) => [...prevSelectedDates, updatedRes[i][j]]);
            } else {
              setSelectedDates((prevSelectedDates) =>
                prevSelectedDates.filter((date) => date !== item.date)
              );
            }

            dateSelected && dateSelected(selectedDates);
            return updatedRes;
          });
        }
        if (['day'].includes(selectedMode)) {
          setSelectedDates(item);
        }

        if (selectedMode === 'week') {
          onChange(res[i], `${curYear}-${curMonth + 1} ${i + 1}周`)
        } else {
          onChange(item)

        }
      };


      /**
       *
       * @param item
       * @param rowIndex
       */

      const getDayClassName = (item: DayItem, rowIndex: number) => {
        console.log('getDayClassName', selectedDates.comprehensiveStr)
        return `${
          item.monthSortMode ? 'notCurMonth' : ''}
      ${item.date === curDate ? 'currentDay' : ''}
      ${item.isSelected ? 'onSelect' : ''}
      ${item.isRangeSelected ? 'rangeSelectd' : ''}
      ${item.isWeekend ? 'weekend' : ''}
      ${item.isToday ? 'today' : ''}
      ${item.comprehensiveStr === selectedDates.comprehensiveStr ? 'onSelect' : ''}
      ${picker === 'week' && rowIndex == weekRow ? 'weekRow' : ''}
      `
      }

      const onYearChange = (value: string) => {
        if (selectedMode === 'year') {
          onChange({comprehensiveStr: value})
        }
        handleGetDays(value, curMonth - 1, startOfWeek!, cFormat);
        setCurYear(value)

      }
      const onMonthChange = (value) => {
        handleGetDays(curYear, value, startOfWeek!, cFormat);
        setCurMonth(value - 1);

      }
      const onQuarterChange = (quarter) => {
        setQuarter(quarter.value)
      }
      const clearSetSelectedDates = () => {
        if (selectedMode === 'week') {
          setWeekRow(null)
        }
        if (selectedMode === 'day') {
          setSelectedDates(() => ({}))

        }
        if (selectedMode === 'month') {
          setCurMonth(-1)

        }
        if (selectedMode === 'year') {
          setCurYear(null)

        }
        console.log('clearSetSelectedDates', selectedDates)

      }
      useImperativeHandle(ref, () => ({
        handleGetDays,
        handleCreateDatePicker,
        onYearChange,
        onMonthChange,
        prevMonth,
        nextMonth,
        nextYear,
        prevYear,
        setDateSelected,
        clearSetSelectedDates,
      }))

      return (
        <div onClick={(event) => event.stopPropagation()} className={`calendar ${className}`}>
          {typeof headerRender === 'function' && headerRender({
            curYear,
            curMonth,
            years
          })}
          {typeof dateRender === 'function' ? dateRender() : <>
            {['day', 'single', 'noSelect', 'multiple', 'week'].includes(selectedMode) && <table className="calendar-table">
              <thead>
              <tr>
                {weeks.map((item: string, i: number) => (
                  <th className='week' key={i}>{item}</th>
                ))}
              </tr>
              </thead>
              <tbody>
              {res.map((dates: DayItem[], rowIndex: number) => (
                <tr key={rowIndex}

                >
                  {dates.map((item: DayItem, columIndex: number) => (
                    <td
                      key={columIndex}

                      onClick={() => handleItemClick(item, rowIndex, columIndex)}
                    >
                      {typeof dayCellRender === 'function' ? (
                        <>{dayCellRender(item)}</>
                      ) : (
                        <div style={_style}
                             className={`day ${getDayClassName(item, rowIndex)} `}>
                          {item.date}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              </tbody>
            </table>}

            {'month' === selectedMode && <main className='block-12'>
              {monthDate.map((item, index) => {
                return <div key={index} className={`block-chlid ${item.value === curMonth + 1 + '月' ? 'onSelect' : ''}`}
                            onClick={() => {
                              onMonthChange(item, index + 1)
                            }}>{item.value}</div>
              })}
            </main>
            }

          </>}

          {typeof footerRender === 'function' && footerRender()}
          <div className='background'/>
        </div>
      );
    }
  )
;

export default Calendar;
