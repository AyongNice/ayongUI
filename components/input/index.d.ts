import React, {ReactPropTypes} from 'react';

export interface InputProps {
  value: string; // 默认值
  defaultValue?: string; // 默认值
  style?: React.CSSProperties; // 自定义样式
  className?: string; // 自定义样式类名
  disabled?: boolean; // 禁用
  maxLength?: number | null; // 最大长度
  clerabled?: boolean; // 是否显示清除按钮
  icon?: React.ReactElement; // icon图标
  size?: 'large' | 'normal' | 'small'; // 输入框尺寸，nora
  type?: 'text' | 'password' | 'textarea'; // 按钮类型：文本、密码、富文本、数字
  btnType?: 'primary' | 'default' | 'dashed'; // 按钮样式类型 利用样式实现
  placeholder?: string; // 占位符
  addonBefore?: React.ReactElement | string; // 前置标签
  addonAfter?: React.ReactElement | string; // 后置标签
  onFocus?: Function; // 聚焦回调
  onBlur?: Function; // 失焦回调
  onKeyUp?: Function; // 键入回调
  onChange: Function; // 值变动回调
  prefix?: React.ReactElement | string; // 前缀
  suffix?: React.ReactElement | string; // 后缀
  visibilityToggle?: VisibilityToggle // 密码可见性切换
}

interface VisibilityToggle {
  visible: boolean;
  iconRender: (visible: boolean) => React.ReactElement;
  onVisibleChange: (visible: boolean) => void;
}

declare const Button: React.FC<InputProps>;

export default Button;
