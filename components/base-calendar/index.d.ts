import React from 'react';

export interface CalendarProps {
  style?: React.CSSProperties; // 自定义样式
  className?: string; // 自定义类名
  disabled?: boolean; // 禁用
  onChange: (day: DayItem | DayItem[]) => void;//选择变化
  dayCellRender?: (day: DayItem) => React.ReactNode | null; // 自定义日期渲染
  picker: 'date' | 'month' | 'year' | 'quarter';// 选择器类型,
  isRange?: boolean; // 是否是范围选择
  value?: Date | Date[]; // 日期值
  defaultValue?: Date | Date[]; // 默认日期值
  disabledDate?: (day: DayItem) => boolean; // 禁用日期
  showToday?: boolean; // 是否展示今天
  yearsRange?: [number, number]; // 年份范围
  onChange?: (day: DayItem | DayItem[]) => void; // 日期变化
  onClear?: () => void; // 清空
  onMonthChange?: (month: number) => void; // 月份变化
  showTmie?: boolean;
}


export interface DayItem {
  "date": string,// 日期字符
  "comprehensive": Date,// 日期类型
  "comprehensiveStr": "2024-02-02",
  "monthSortMode": number, // 日期模式 0 上个月 1 当月 2 下个月
  "isSelected": boolean, // 是否选中
  "isRangeSelected": boolean, // 是否在范围内
  "isToday": boolean,// 是否是今年今天
}

declare const Calendar: React.FC<CalendarProps>;

export default Calendar;
