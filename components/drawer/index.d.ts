import React from 'react';

export interface DrawerProps {
  title?: React.ReactNode; // 标题 默认值''
  zIndex?: number; // z-index 默认值 999
  open?: boolean; // 是否显示  默认值 false
  bodyClassName?: string; // 自定义类名 默认值''
  headerClassName?: React.CSSProperties; // 头部样式 默认值''
  getContainer?: boolean; // 容器 默认值 false
  size?: 'string'; // 像素大小 top/bottom 时使用 高度  left/right 时使用 宽度 默认值''
  maskClosable?: boolean; // 点击遮罩是否关闭  默认值 true
  placement?: 'top' | 'right' | 'bottom' | 'left'; // 位置 默认值 right
  onClose?: (e: React.MouseEvent<HTMLElement>) => void; // 关闭回调
  children: React.ReactNode; // 内容
  mainRender?: React.ReactNode; // 自定义抽屉内容
  headerRender?: React.ReactNode; // 自定义抽屉内容
  afterOpenChange?: (visible: boolean) => void; // 显示隐藏回调
  closeIcon?: React.ReactNode | null; // 关闭按钮 默认值 null
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
