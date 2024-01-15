import React, {useState, useEffect, FC, ReactNode} from 'react';
import {getDaysInMonth, handleCrateDate, handleCreateDatePicker, parseTime} from './utils.js';
import {CalendarProps, DayItem} from './index.d'
import Select from '../select/index.tsx'
import './index.less'

const Calendar: FC<CalendarProps> = ({
                                       children,
                                       tbodyHeight,
                                       style,
                                       rangeTime = [],
                                       yearsRange = [1970, 2099],
                                       selectedMode = 'noSelect',
                                       startOfWeek,
                                       disabled = false,
                                       dateSelected = () => {
                                       },
                                       dayRender = null
                                     }) => {
  const cFormat: string = '{d}';

  const [monthOptions, setMonthOptions] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [weeks, setWeeks] = useState<string[]>(['一', '二', '三', '四', '五', '六', '日']);
  const [curYear, setCurYear] = useState<number>(new Date().getFullYear());
  const [curMonth, setCurMonth] = useState<number>(new Date().getMonth());
  const [days, setDays] = useState<number>(0);
  const [curDate, setCurDate] = useState<string>(parseTime(new Date().getTime()), cFormat);

  const [prevDays, setPrevDays] = useState<any[]>([]);
  const [rearDays, setRearDays] = useState<any[]>([]);
  const [curDays, setCurDays] = useState<any[]>([]);
  const [showDays, setShowDays] = useState<any[]>([]);


  const [res, setRes] = useState<any[][]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [moveIndex, setMoveIndex] = useState<number[]>([]);
  const [canMove, setCanMove] = useState<boolean>(false);
  useEffect(() => {
    setWeeks([...weeks.slice(startOfWeek! - 1), ...weeks.slice(0, startOfWeek! - 1)]);
    handleGetDays(curYear, curMonth, startOfWeek!, cFormat);
  }, [startOfWeek, curYear, curMonth]);

  useEffect(() => {

    if (localStorage.selectedDates) {
      setSelectedDates(JSON.parse(localStorage.selectedDates));
    }
  }, []);


  /**
   * 获取日期
   * @param year
   * @param month
   * @param startOfWeek
   * @param cFormat
   */
  const handleGetDays = (year: number, month: number, startOfWeek: number, cFormat: string) => {
    const monthOptions = handleCreateDatePicker().months;
    const yearOptions = handleCreateDatePicker(yearsRange).years.slice(0, 58);

    setMonthOptions(monthOptions);
    setYearOptions(yearOptions);

    const curDays = handleCrateDate({year, month, start: 1, end: getDaysInMonth(year, month), cFormat});
    setCurDays(curDays);

    const firstDayOfWeek = new Date(`${year}-${month + 1}-01`).getDay();
    const obj: Record<number, string> = {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 0: '日'};
    const firstDayInCN = obj[firstDayOfWeek];
    const index = weeks.indexOf(firstDayInCN);

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

    setPrevDays(newPrevDays);
    setRearDays(newRearDays);
    setShowDays(newShowDays);
    setRes(newRes);

  };
  /**
   * 格式化日期
   * @param arr
   * @param size
   */
  const handleFormatDates = (arr: any[], size = 7): any[][] => {
    const arr2: any[][] = [];
    for (let i = 0; i < size; i++) {
      const temp = arr.slice(i * size, i * size + size);
      arr2.push(temp);
    }
    return arr2;
  };

  /**
   * 点击日期
   * @param item
   * @param i
   * @param j
   */
  const handleItemClick = (item: DayItem, i: number, j: number) => {
    if (disabled) return;
    console.log('handleItemClick', item, i, j)
    /** 点击上下月切换月份 **/
    if (selectedMode === 'noSelect') {
      const clickYaerItem = new Date(item.comprehensiveStr).getFullYear();
      console.log(clickYaerItem, curYear, clickYaerItem > curYear)

      if (clickYaerItem === curYear) { //同一年

        /** 同一年 上一月**/
        if (item.monthSortMode === 1 && curMonth >= 0) {
          setCurMonth(prevSate => {
            return prevSate - 1
          });
        }
        /** 同一年 下一月**/
        if (item.monthSortMode === 2 && curMonth <= 12) {
          setCurMonth(prevSate => {
            return prevSate + 1
          });
        }
        handleGetDays(curYear, curMonth - 1, startOfWeek!, cFormat);
      } else {

        setCurMonth(1);

        /** 上一年**/
        if (clickYaerItem > curYear) {
          setCurYear(prevSate => {
            return prevSate + 1
          });

        }
        /** 上一年**/
        if (clickYaerItem < curYear) {
          console.log('上一年---curMonth', curMonth)
          setCurYear(prevSate => {
            return prevSate - 1
          });
        }
        handleGetDays(curYear, curMonth - 1, startOfWeek!, cFormat);
      }

    }

    if (selectedMode === 'multiple') {
      setRes((prevRes) => {
        const updatedRes = [...prevRes];
        updatedRes[i][j].isSelected = !updatedRes[i][j].isSelected;
        if (updatedRes[i][j].isSelected) {
          setSelectedDates((prevSelectedDates) => [...prevSelectedDates, updatedRes[i][j].date]);
        } else {
          setSelectedDates((prevSelectedDates) =>
            prevSelectedDates.filter((date) => date !== item.date)
          );
        }
        console.log('selectedDates', selectedDates)
        dateSelected && dateSelected(selectedDates);
        return updatedRes;
      });
    }
    if (selectedMode === 'single') {
      setSelectedDates(item.comprehensiveStr);
    }
  };

  const handleItemMove = (data: DayItem, i: number, j: number) => {

    return
    if (canMove && !selectedMode) {
      const index = i * 7 + j;
      setShowDays((prevShowDays) => {
        const updatedShowDays = [...prevShowDays];
        updatedShowDays.forEach((item) => {
          item.isSelected = false;
          item.isRangeSelected = false;
        });
        updatedShowDays[index].isSelected = true;
        updatedShowDays[moveIndex[0]].isSelected = true;
        if (moveIndex[0] < index) {
          for (let i = moveIndex[0] + 1; i < index; i++) {
            updatedShowDays[i].isRangeSelected = true;
          }
        } else {
          for (let i = index + 1; i < moveIndex[0]; i++) {
            updatedShowDays[i].isRangeSelected = true;
          }
        }
        return updatedShowDays;
      });
    }
  };

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

  const showNext = (): boolean => {
    if (!rangeTime || rangeTime[0]) return true;
    const dateObject = new Date(rangeTime[0]);
    const currentDate = new Date(curYear, curMonth, 1);
    return currentDate > dateObject;
  };

  const showPrev = (): boolean => {
    if (!rangeTime || !rangeTime[1]) return true;
    const dateObject = new Date(rangeTime[1]);
    const currentDate = new Date(curYear, curMonth + 1, 1);
    return currentDate < dateObject;
  };

  /**
   * 月份选择
   * @param value
   */
  const onMonthOptionsChange = (value: string) => {
    console.log('onMonthOptionsChange', curYear, value, monthOptions)
    handleGetDays(curYear, value - 1, startOfWeek!, cFormat);
    setCurYear(value)
  }
  /**
   * 年份选择
   * @param value
   */
  const onYearOptionsChange = (value: string) => {
    handleGetDays(value, curMonth - 1, startOfWeek!, cFormat);
  }

  const getDayClassName = (item: DayItem) => {
    return `${
      item.monthSortMode ? 'notCurMonth' : ''}
      ${item.date === curDate ? 'currentDay' : ''}
      ${item.isSelected ? 'onSelect' : ''}
      ${item.isRangeSelected ? 'rangeSelectd' : ''}
      ${item.isWeekend ? 'weekend' : ''}
      ${item.isToday ? 'today' : ''}
      ${item.comprehensiveStr === selectedDates ? 'onSelect' : ''}
      `
  }
  return (
    <div className="calendar">
      <Select style={{width: 80, marginRight: '20px'}}
              value={curYear}
              defaultValue={curYear}
              options={yearOptions}
              onChange={onYearOptionsChange}/>

      <Select style={{width: 80}}
              value={curMonth + 1}
              defaultValue={curMonth + 1}
              options={monthOptions}
              onChange={onMonthOptionsChange}/>

      <table className="calendar-table" style={style}>
        <thead>
        <tr>
          {weeks.map((item: string, i: number) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {res.map((dates: DayItem[], warpIndex: number) => (
          <tr key={warpIndex} style={style}>
            {dates.map((item: DayItem, childindex: number) => (
              <td
                key={childindex}
                onClick={() => handleItemClick(item, warpIndex, childindex)}
                onMouseOver={() => handleItemMove(item, warpIndex, childindex)}
              >
                {typeof dayRender === 'function' ? (
                  <>{dayRender(item)}</>
                ) : (
                  <div className={`day ${getDayClassName(item)}`}>{item.date}</div>
                )}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
