import React from 'react';

export interface FormProps {
  name?: string; // 表单名称
  style?: React.CSSProperties; // 表单的样式
  labelWidth?: string; // 标签的宽度，默认为 '100px'
  form?: any; // 表单实例对象，默认为空对象
  children: React.ReactNode; // 子元素
  wrapperCol?: { [key: string]: any }; // 包裹列的样式
  initialValues?: { [key: string]: any }; // 初始值对象，默认为空对象
  autoComplete?: string; // 自动完成属性
  errorInfo?: { errorFields: { name: string; errors: string }[] }; // 表单校验错误信息
  disabled?: boolean; // 是否禁用，默认为 false
  formLayout?: 'left' | 'right' | 'vertical'; // 表单布局方式，默认为 'right'
  submit?: () => void; // 表单提交时的回调函数，默认为空函数
  onFinish?: () => void; // 表单完成时的回调函数，默认为空函数
  onFinishFailed?: () => void; // 表单完成失败时的回调函数，默认为空函数
  onValuesChange?: () => void; // 表单值变化时的回调函数，默认为空函数

}


export interface CloneFormElementProps extends FormProps {
  _fromDate?: { [key: string]: any }; //内部函数(方式命名冲突) 表单数据对象
  _onFinishFailed?: (type: string, field: { name: string; errors: string | any }) => void; // 内部函数(方式命名冲突) 表单项校验失败回调函数
}


export interface FormItemProps {
  label: string; // 标签文本
  name: string; // 表单项名称
  style?: React.CSSProperties; // 自定义样式
  form: any; // 表单实例对象
  isWarp?: boolean; // 是否包裹子元素
  labelWidth?: string; // 标签宽度
  rules?: { [key: string]: any }[]; // 表单校验规则数组
  disabled?: boolean; // 是否禁用
  children: React.ReactNode; // 子元素
  _fromDate?: { [key: string]: any }; // 表单数据对象
  formLayout?: 'left' | 'right' | 'vertical'; // 表单布局方式，默认为右对齐
  errorInfo?: { errorFields: { name: string; errors: string }[] }; // 表单项校验错误信息
  onChange?: (name: string, value: any) => void; // 表单项值改变回调函数
  _onFinishFailed?: (type: string, field: { name: string; errors: string | any }) => void; // 表单项校验失败回调函数
}
export interface CloneElementProps {
  childSource: React.ReactNode; // 子元素源
  child: React.ReactNode; // 子元素
  value: any; // 表单项的值
  disabled?: boolean; // 是否禁用
  onChange: (value: any) => void; // 表单项值改变回调函数
}

declare const Form: React.FC<FormProps>;

export default Form;
