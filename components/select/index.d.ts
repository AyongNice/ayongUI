import React from 'react';

export interface Options {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  className?: string;// 类名
  defaultValue?: string | string[];// 默认值
  value?: string | string[];// 选中值
  style?: React.CSSProperties;// 样式
  onChange?: (value: string | string[]) => void;// 选中值改变时的回调
  options: Options[];// 选项数据
  disabled?: boolean;// 是否禁用
  clearable?: boolean;// 是否可清空
  search?: boolean;// 是否可搜索
  collapseTags?: boolean;//是否折叠多选
  optionRender?: (opt: options) => React.FC | null //自定义下拉模版
  optionHeaderRender?: (opt: options) => React.FC | null //自定义下来模版
}

export interface OptionsParma {
  options: Options[];// 选项数据
  onClick: Function;// 点击事件
  selectedValues?: string[];// 选中值
}

declare const Select: React.FC<SelectProps>;

export default Select;
