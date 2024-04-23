import React from "react";

export interface ModalProps {
  title?: string; // 标题 默认值''
  zIndex?: number; // z-index 默认值 999
  open?: boolean; // 是否显示  默认值 false
  style: Object;//弹框样式 默认值{width: '50%'}
  bodyClassName?: string; // 自定义类名 默认值''
  headerClassName?: React.CSSProperties; // 头部样式 默认值''
  type?: 'info' | 'success' | 'warning' | 'error',//API调用弹框类型
  content: string;//API调用弹框内容
  okText: string;//API调用弹框确定按钮
  cancelText: string;//API调用弹框取消按钮
  size?: 'string'; // 像素大小 top/bottom 时使用 高度  left/right 时使用 宽度 默认值''
  maskClosable?: boolean; // 点击遮罩是否关闭  默认值 true
  placement?: 'top' | 'right' | 'bottom' | 'left'; // 位置 默认值 right
  onClose?: (e: React.MouseEvent<HTMLElement>) => void; // 关闭回调
  children: React.ReactNode; // 内容
  mainRender?: () => React.ReactNode; // 自定义抽屉内容
  headerRender?: () => React.ReactNode; // 自定义抽屉内容
  closeIcon?: React.ReactNode | null; // 关闭按钮 默认值 null
  footerRender: () => React.ReactNode;
  destroyOnClose?: boolean; // 关闭时销毁
  forceRender?: boolean; // 强制渲染
}

interface EventModal {
  onClose: Function;//点击关闭按钮
  onOk: Function;//点击确定按钮
  onCancel: Function;//点击取消按钮
}

export interface ConfirmProps extends ModalProps, EventModal {
  content: string;//API调用弹框内容
  okText: string;//API调用弹框确定按钮
  cancelText: string;//API调用弹框取消按钮
}

declare const Modal: React.FC<ModalProps>;

export default Modal;
