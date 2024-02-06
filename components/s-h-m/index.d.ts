import React from 'react';

export interface TimePickerProps {
  style?: React.CSSProperties; // 自定义样式
  defaultValue: string;
  className: string;
  value: string;
  onChange: () => void;
  onCancel: () => void;
}


declare const TimePicker: React.FC<TimePickerProps>;

export default TimePicker;
