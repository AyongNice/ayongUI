import { FC, useEffect, useRef, useState } from 'react';
import BaseCalendar from '../base-calendar/index.tsx';
import Select from '../select/index.tsx';
import { CalendarProps } from './index.d';

const Calendar: FC<CalendarProps> = (porps) => {
  const {
    style,
    value,
    yearsRange = [1970, 2099],
    selectedMode = 'noSelect',
    startOfWeek,
    disabled = false,
    dayCellRender = null,
    dateSelected = () => {},
    onChange = (day) => {},
  } = porps;
  const cFormat: string = '{d}';
  const _style = { width: 120, height: 100, ...style };

  const childRef = useRef(null);
  const [monthOptions, setMonthOptions] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<number[]>([]);

  useEffect(() => {
    const monthOptions = childRef.current.handleCreateDatePicker().months;
    const yearOptions = childRef.current
      .handleCreateDatePicker(yearsRange)
      .years.slice(0, 58);
    setMonthOptions(monthOptions);
    setYearOptions(yearOptions);
  }, []);

  /**
   * 年份选择
   * @param value
   */
  const onYearOptionsChange = (value: string) => {
    childRef.current.onYearChange(value);
  };
  /**
   * 月份选择
   * @param value
   */
  const onMonthOptionsChange = (value: string) => {
    childRef.current.onMonthChange(value);
  };

  return (
    <BaseCalendar
      ref={childRef}
      {...porps}
      style={_style}
      headerRender={({ curYear, curMonth }) => {
        return (
          <>
            {yearOptions.length && monthOptions.length && (
              <>
                <Select
                  style={{ width: 80, marginRight: '20px' }}
                  value={curYear}
                  defaultValue={curYear}
                  options={yearOptions}
                  onChange={onYearOptionsChange}
                />

                <Select
                  style={{ width: 80, marginBottom: 20 }}
                  value={curMonth + 1}
                  defaultValue={curMonth + 1}
                  options={monthOptions}
                  onChange={onMonthOptionsChange}
                />
              </>
            )}
          </>
        );
      }}
    />
  );
};

export default Calendar;
