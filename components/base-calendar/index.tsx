import React, {useState, useImperativeHandle, useRef, useEffect, FC, ReactNode} from 'react';
import {getDaysInMonth, handleCrateDate, handleCreateDatePicker, parseTime} from './utils.js';
import {CalendarProps, DayItem} from './index.d'
import Select from '../select/index.tsx'
import './index.less'
import {isValidDate} from "ayongUI/components/calendar/utils";
import {lightHover} from './hover.js'

const Calendar: FC<CalendarProps> = React.forwardRef(({
                                                        style,
                                                        value,
                                                        defaultValue = '',
                                                        yearsRange = [1970, 2099],
                                                        selectedMode = 'noSelect',
                                                        startOfWeek,
                                                        // curYear,
                                                        // curMonth,
                                                        disabled = false,
                                                        dayCellRender = null,
                                                        dateSelected = () => {
                                                        },
                                                        onChange = (day) => {
                                                        },
                                                        curYearChange = () => {
                                                        },
                                                        curMonthChange = () => {
                                                        },
                                                        headerRender = null
                                                      }, ref) => {
      const cFormat: string = '{d}';
      const _style = {width: 120, height: 100, ...style}
      const _defaultValue = defaultValue.split('-');
      if (_defaultValue[1]) {//月份-1
        _defaultValue[1] = _defaultValue[1] - 1;
      }

      const [monthOptions, setMonthOptions] = useState<string[]>([]);
      const [yearOptions, setYearOptions] = useState<number[]>([]);
      const [weeks, setWeeks] = useState<string[]>(['一', '二', '三', '四', '五', '六', '日']);
      const [curYear, setCurYear] = useState<number>(Number(_defaultValue[0]) || new Date().getFullYear());
      const [curMonth, setCurMonth] = useState<number>(Number(_defaultValue[1]) || new Date().getMonth());
      const [curDate, setCurDate] = useState<string>(parseTime(new Date().getTime()), cFormat);

      const [showComponent, setShowComponent] = useState(true);
      const [res, setRes] = useState<any[][]>([]);
      const [selectedDates, setSelectedDates] = useState<string[]>([]);
      useEffect(() => {
        setWeeks([...weeks.slice(startOfWeek! - 1), ...weeks.slice(0, startOfWeek! - 1)]);
        handleGetDays(curYear, curMonth, startOfWeek!, cFormat);
      }, [curYear, curMonth, defaultValue]);


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
        const monthOptions = handleCreateDatePicker().months;
        const yearOptions = handleCreateDatePicker(yearsRange).years.slice(0, 58);

        setMonthOptions(monthOptions);
        setYearOptions(yearOptions);

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

        if (curMonth <= 12) {
          setCurMonth(prevSate => {
            return prevSate + 1
          });
          handleGetDays(curYear, curMonth - 1, startOfWeek!, cFormat);
        }
      }

      /** 同一年 上一月**/
      const prevMonth = () => {
        if (curMonth >= 0) {
          setCurMonth(prevSate => {
            return prevSate - 1
          });
          handleGetDays(curYear, curMonth - 1, startOfWeek!, cFormat);
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
      /**
       * 点击日期
       * @param item
       * @param i
       * @param j
       */
      const handleItemClick = (item: DayItem, i: number, j: number) => {
        if (disabled) return;
        /** 点击上下月切换月份 **/
        if (selectedMode === 'noSelect') {
          const clickYaerItem = new Date(item.comprehensiveStr).getFullYear();

          if (clickYaerItem === curYear) { //同一年

            /** 同一年 上一月**/
            if (item.monthSortMode === 1) {
              prevMonth()
            }
            console.log('item.monthSortMode', item.monthSortMode)

            /** 同一年 下一月**/
            if (item.monthSortMode === 2 && curMonth <= 12) {
              nextMonth()
            }

          } else {
            curMonthChange(1)

            /** 上一年**/
            if (clickYaerItem > curYear) {
              nextYear()

            }
            /** 下一年**/
            if (clickYaerItem < curYear) {
              prevYear()

            }

          }

        }

        if (selectedMode === 'multiple') {
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
        if (selectedMode === 'single') {
          setSelectedDates(item);
          onChange(item)
        }
      };


      const getDayClassName = (item: DayItem) => {
        return `${
          item.monthSortMode ? 'notCurMonth' : ''}
      ${item.date === curDate ? 'currentDay' : ''}
      ${item.isSelected ? 'onSelect' : ''}
      ${item.isRangeSelected ? 'rangeSelectd' : ''}
      ${item.isWeekend ? 'weekend' : ''}
      ${item.isToday ? 'today' : ''}
      ${item.comprehensiveStr === selectedDates.comprehensiveStr ? 'onSelect' : ''}
      `
      }

      const handleQuickChange = (type: string) => {
        if (type === 'prev') {
          setCurMonth((prevMonth) => {
            const newMonth = prevMonth - 1;
            if (newMonth === -1) {
              setCurYear((prevYear) => prevYear - 1);
              return 11;
            }
            return newMonth;
          });
        } else if (type === 'next') {
          setCurMonth((prevMonth) => {
            const newMonth = prevMonth + 1;
            if (newMonth === 12) {
              setCurYear((prevYear) => prevYear + 1);
              return 0;
            }
            return newMonth;
          });
        }
      };

      const onYearChange = (value) => {
        handleGetDays(value, curMonth - 1, startOfWeek!, cFormat);
        setCurYear(value)
      }
      const onMonthChange = (value) => {
        handleGetDays(curYear, value, startOfWeek!, cFormat);
        setCurMonth(value - 1)
      }
      useImperativeHandle(ref, () => ({
        handleGetDays,
        monthOptions,
        yearOptions,
        onYearChange,
        onMonthChange,
        prevMonth,
        nextMonth,
        nextYear,
        prevYear

      }))
      const trRefs = useRef([]);

      return (
        <div className="calendar">
          {typeof headerRender === 'function' && headerRender({
            curYear,
            curMonth,
            monthOptions,
            yearOptions,
          })}

          <table className="calendar-table">
            <thead>
            <tr>
              {weeks.map((item: string, i: number) => (
                <th key={i}>{item}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {res.map((dates: DayItem[], warpIndex: number) => (
              <tr key={warpIndex}>
                {dates.map((item: DayItem, childindex: number) => (
                  <td
                    key={childindex}
                    onClick={() => handleItemClick(item, warpIndex, childindex)}

                  >
                    {typeof dayCellRender === 'function' ? (
                      <>{dayCellRender(item)}</>
                    ) : (
                      <div ref={(trRef) => trRefs.current.push(trRef)} style={_style}
                           className={`day ${getDayClassName(item)}`}>
                        <div className='inner'>
                          {item.date}
                        </div>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      );
    }
  )
;

export default Calendar;
