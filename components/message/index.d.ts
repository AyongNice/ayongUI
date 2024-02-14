import React, {ReactNode} from 'react';


export interface MessageProps {
  message: string | number | ReactNode; // 提示内容
  showClose?: boolean; // 是否显示关闭按钮
  type?: keyof type; // 按钮类型 利用样式实现
  onClose?: () => void; // 关闭回调
  icon?: React.Fc;//react Icon
  duration?: number; // 自动关闭的延时，单位秒。设为 0 时不自动关闭
  useHTMLString?: boolean;// 是否将 message 属性作为 HTML 片段处理
}

export interface NotificationState {
  container: Node;
  onClose: () => void;
}

export interface NotificationProps extends MessageProps {
  onAyongClose: () => void;
  style?: React.CSSProperties;
}

declare const Message: React.FC<MessageProps>;

export default Message;
