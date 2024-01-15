import React from 'react';

export interface CalendarProps {
  style?: React.CSSProperties; // 自定义样式
  time?: number; // 防抖时间设置 0 为不防抖
  href?: string; // 跳转连接
  className?: string; // 自定义样式类名
  children: React.ReactNode; // 按钮内容
  disabled?: boolean; // 禁用
  icon?: React.ReactElement; // icon图标
  type?: 'primary' | 'dashed' | 'safe' | 'error' | 'warn'; // 按钮类型 利用样式实现
  size?: 'large' | 'default' | 'small'; // 按钮大小 利用样式padding 实现
  shape?: 'circle' | 'default' | 'round' | 'strong'; // 按钮形状 利用样式border-radius 实现
  htmlType?: 'button' | 'submit' | 'reset'; // 原生button类型
  onClick?: () => void; // 点击事件
  dayRender?: (day: DayItem) => React.ReactNode | null; // 自定义日期渲染
}


export interface DayItem {
  "date": string,// 日期字符
  "comprehensive": Date,// 日期类型
  "comprehensiveStr": "2024-02-02",
  "monthSortMode": number, // 日期模式 0 上个月 1 当月 2 下个月
  "isSelected": false, // 是否选中
  "isRangeSelected": false, // 是否在范围内
  "isToday": false,// 是否是今年今天
}

declare const Calendar: React.FC<CalendarProps>;

export default Calendar;
