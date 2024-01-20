import React from 'react';

export interface DatePickerProps {
  style?: React.CSSProperties; // 自定义样式
  disabled?: boolean; // 禁用
  selectedMode: 'noSelect' | 'single' | 'multiple';//选择模式
  onChange: (day: DayItem | DayItem[]) => void;//选择变化
  dayCellRender?: (day: DayItem) => React.ReactNode | null; // 自定义日期渲染
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

declare const DatePicker: React.FC<DatePickerProps>;

export default DatePicker;
