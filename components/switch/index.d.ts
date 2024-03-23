export interface SwitchProps {
  value?: boolean;// 默认值
  style?: React.CSSProperties;//  样式
  title?: string;// 标题
  className?: string;// 样式类名
  disabled?: boolean;// 是否禁用
  activeColor?: string;//打开时的颜色
  inactiveColor?: string;// 关闭时的颜色
  onChange?: (value: boolean) => void;// 状态改变时的回调

}

declare const Switch: React.FC<SwitchProps>;

export default Switch;
