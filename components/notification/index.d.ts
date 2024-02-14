import React from "react";

export interface NotificationProps {
  title?: string; // 标题 默认值''
  zIndex?: number; // z-index 默认值 999
  style: Object;//弹框样式 默认值{width: '50%'}
  className?: string; // 自定义类名 默认值''
  type?: 'info' | 'success' | 'warning' | 'error',//API调用弹框类型
  message: string;//API调用弹框内容
  placement?: 'top' | 'right' | 'bottom' | 'left'; // 位置 默认值 right
  onClose?: () => void; // 关闭回调
  closeIcon?: React.Fc | null; // 关闭按钮 默认值 null
}

interface EventModal {
  onClose: Function;//点击关闭按钮
  onOk: Function;//点击确定按钮
  onCancel: Function;//点击取消按钮
}

export interface ConfirmProps implements ModalProps, EventModal {
  content: string;//API调用弹框内容
  okText: string;//API调用弹框确定按钮
  cancelText: string;//API调用弹框取消按钮
}

declare const Notification: React.FC<NotificationProps>;

export default Notification;
