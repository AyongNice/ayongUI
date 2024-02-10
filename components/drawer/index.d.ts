import React from 'react';

export interface DrawerProps {
  title?: React.ReactNode; // 标题
  width?: number | string; // 宽度
  zIndex?: number; // z-index
  open?: boolean; // 是否显示
  mainClassName?: string; // 自定义类名
  headerCalssName?: React.CSSProperties; // 头部样式
  getContainer?: string | HTMLElement | (() => HTMLElement); // 容器
  size?: 'string'; // 像素大小 top/bottom 时使用 高度  left/right 时使用 宽度
  mask?: boolean; // 是否显示遮罩
  maskClosable?: boolean; // 点击遮罩是否关闭
  placement?: 'top' | 'right' | 'bottom' | 'left'; // 位置
  onClose?: (e: React.MouseEvent<HTMLElement>) => void; // 关闭回调
  children: React.ReactNode; // 内容
  mainRender?: React.ReactNode; // 自定义抽屉内容
  afterOpenChange?: (visible: boolean) => void; // 显示隐藏回调
  maskClosable?: boolean; // 点击遮罩是否关闭
  maskStyle?: React.CSSProperties; // 遮罩样式
  closeIcon?: React.ReactNode; // 关闭按钮
  destroyOnClose?: boolean; // 关闭时销毁
  forceRender?: boolean; // 强制渲染
  keyboard?: boolean; // 是否支持键盘 esc 关闭

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

declare const Drawer: React.FC<DrawerProps>;

export default Drawer;
