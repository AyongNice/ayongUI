import React, {useState, useEffect, FC, ReactNode} from 'react';
import {getDaysInMonth, handleCrateDate, handleCreateDatePicker, parseTime} from './utils.js';
import {CalendarProps} from './index.d'
import Select from '../select/index.tsx'

const Calendar: FC<CalendarProps> = (props) => {
  const [monthOptions, setMonthOptions] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [weeks, setWeeks] = useState<string[]>(['一', '二', '三', '四', '五', '六', '日']);
  const [curYear, setCurYear] = useState<number>(new Date().getFullYear());
  const [curMonth, setCurMonth] = useState<number>(new Date().getMonth());
  const [days, setDays] = useState<number>(0);
  const [curDate, setCurDate] = useState<string>(parseTime(new Date().getTime()));
  const [prevDays, setPrevDays] = useState<any[]>([]);
  const [rearDays, setRearDays] = useState<any[]>([]);
  const [curDays, setCurDays] = useState<any[]>([]);
  const [showDays, setShowDays] = useState<any[]>([]);
  const [res, setRes] = useState<any[][]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<boolean>(props.selectMode === 'click');
  const [moveIndex, setMoveIndex] = useState<number[]>([]);
  const [canMove, setCanMove] = useState<boolean>(false);

  useEffect(() => {
    setWeeks([...weeks.slice(props.startOfWeek! - 1), ...weeks.slice(0, props.startOfWeek! - 1)]);
    handleGetDays(curYear, curMonth, props.startOfWeek!);
  }, [props.startOfWeek, curYear, curMonth]);

  useEffect(() => {

    if (localStorage.selectedDates) {
      setSelectedDates(JSON.parse(localStorage.selectedDates));
    }
  }, []);

  const handleGetDays = (year: number, month: number, startOfWeek: number) => {
    const monthOptions = handleCreateDatePicker().months;
    const yearOptions = handleCreateDatePicker().years.slice(0, 53);

    setMonthOptions(monthOptions);
    setYearOptions(yearOptions);
    const curDays = handleCrateDate(year, month, 1, getDaysInMonth(year, month));
    setCurDays(handleCrateDate(year, month, 1, getDaysInMonth(year, month)));

    // Use useEffect to perform actions after state update
    console.log('curDays', curDays);

    const firstDayOfWeek = new Date(`${year}-${month + 1}-01`).getDay();
    const obj: Record<number, string> = {1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 0: '日'};
    const firstDayInCN = obj[firstDayOfWeek];
    const index = weeks.indexOf(firstDayInCN);

    const newPrevDays = handleCrateDate(year, month, 1, index + 1, 'prev');
    const newRearDays = handleCrateDate(year, month, 1, 42 - getDaysInMonth(year, month) - index, 'rear');
    const newShowDays = [...newPrevDays, ...curDays, ...newRearDays];
    const newRes = handleFormatDates(newShowDays);

    setPrevDays(newPrevDays);
    setRearDays(newRearDays);
    setShowDays(newShowDays);
    setRes(newRes);

  };

  const handleFormatDates = (arr: any[], size = 7): any[][] => {
    const arr2: any[][] = [];
    for (let i = 0; i < size; i++) {
      const temp = arr.slice(i * size, i * size + size);
      arr2.push(temp);
    }
    return arr2;
  };

  const handleItemClick = (item: any, i: number, j: number) => {
    if (!props.canSelect) return;
    if (selectedMode) {
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
        props.dateSelected && props.dateSelected(selectedDates);
        return updatedRes;
      });
    } else {
      const index = i * 7 + j;
      setCanMove(true);
      if (moveIndex.length === 1) {
        setCanMove(false);
      }
      if (moveIndex.length === 2) {
        setShowDays((prevShowDays) => {
          const updatedShowDays = [...prevShowDays];
          updatedShowDays.forEach((item) => {
            item.isSelected = false;
            item.isRangeSelected = false;
          });
          return updatedShowDays;
        });
        setCanMove(true);
        setMoveIndex([]);
      }
      setMoveIndex((prevMoveIndex) => [...prevMoveIndex, index]);
      setMoveIndex((prevMoveIndex) => prevMoveIndex.sort((a, b) => a - b));
      setSelectedDates(showDays.slice(moveIndex[0], moveIndex[1] + 1));
      setSelectedDates.length !== 0 && props.dateSelected && props.dateSelected(selectedDates);
    }
  };

  const handleItemMove = (data: any, i: number, j: number) => {
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
    if (!props.rangeTime || !props.rangeTime[0]) return true;
    const dateObject = new Date(props.rangeTime[0]);
    const currentDate = new Date(curYear, curMonth, 1);
    return currentDate > dateObject;
  };

  const showPrev = (): boolean => {
    if (!props.rangeTime || !props.rangeTime[1]) return true;
    const dateObject = new Date(props.rangeTime[1]);
    const currentDate = new Date(curYear, curMonth + 1, 1);
    return currentDate < dateObject;
  };

  return (
    <div className="calendar">
      <Select options={monthOptions}/>
      <table className="calendar-table" style={{width: props.width}}>
        <thead>
        <tr>
          {weeks.map((item, i) => (
            <th key={i}>{item}</th>
          ))}
        </tr>
        </thead>
        <tbody>
        {res.map((dates, i) => (
          <tr key={i} style={{height: props.tbodyHeight}}>
            {dates.map((item, index) => (
              <td
                key={index}
                className={`day ${
                  !item.isCurMonth ? 'notCurMonth' : ''} ${
                  item.date === curDate ? 'currentDay' : ''} ${
                  item.isSelected ? 'selectDay' : ''} ${
                  item.isRangeSelected ? 'rangeSelectd' : ''} ${
                  item.isWeekend ? 'weekend' : ''}`}
                onClick={() => handleItemClick(item, i, index)}
                onMouseOver={() => handleItemMove(item, i, index)}
              >
                {props.children ? (
                  <>{props.children}</>
                ) : (
                  <span>{item.date}</span>
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
