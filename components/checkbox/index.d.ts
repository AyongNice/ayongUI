import React from "react";

export interface CheckboxProps {
  value: string | number;//多个组合时候当前值
  className?: string; // 自定义样式类名最外层的样式
  checked?: boolean; // 是否选中
  disabled: boolean; // 禁用
  defaultValue?: string | number | number [] | string[]; // 默认值
  children: React.ReactNode; // 插槽内容
  size?: 'large' | 'default' | 'small' | 'mini'; // 按钮类型的大小 继承Button组件参数
  type?: 'primary' | 'dashed' | 'safe' | 'error' | 'warn'; // 按钮类型 继承Button组件参数
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // 点击事件
  indeterminate:boolean;//设置 indeterminate 状态，只负责样式控制
}

export interface CheckboxGroupProps extends CheckboxProps {
  options: Option[]; // 按钮类型 继承Button组件参数
  value: Option[]; // 默认值
}

export interface Option {
  value: string | number;
  label: string | number;
  disabled?: boolean;
}

declare const Checkbox: React.FC<CheckboxProps>;

export default Checkbox;
