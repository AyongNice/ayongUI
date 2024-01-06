import React from 'react';

export interface UploadProps {
  mode?: string;//模式 手动 头像
  className: string;
  uplaodText: string;//上传文案
  uplaodRender?: (onUplaod: Function) => React.ReactNode | null;//自定义上传按钮
  maxUploadFileSize?: number | null; // 限制文件大小，单位 kb
  maxCount?: number | null; // 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件
  iconRender?: (file: any, listType: string) => React.ReactNode | null; // 自定义文件预览图标
  accept?: string; // 接受上传的文件类型
  action?: string; // 上传的地址
  data?: object | ((file: UploadFile) => object | Promise<object>); // 上传所需参数或返回上传参数的方法
  headers?: object; // 设置上传的请求头部
  withCredentials?: boolean; // 上传请求时是否携带 cookie
  beforeUpload?: (file: UploadFile | boolean) => boolean | Promise<UploadFile>; // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
  onRemove: (file: UploadFile | boolean) => boolean | Promise<UploadFile>;//点击移除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除
  customRequest?: (file: UploadFile) => void ; // 通过覆盖默认的上传行为，可以自定义自己的上传实现
  defaultUploadFileList?: UploadFile[]; // 默认已经上传的文件列表
  disabled?: boolean; // 是否禁用
  fileList?: UploadFile[] | null; // 已经上传的文件列表（受控）
  defaultFileList?: UploadFile[]; // 默认已经上传的文件列表
  fileListRender: (fileItme, index, handleDelete) => React.ReactNode | null; // 自定义已上传文件列表的渲染方法
  listType?: 'text' | 'picture' | 'picture-card'; // 上传列表的内建样式
  multiple?: boolean; // 是否支持多选文件
  name?: string; // 发到后台的文件参数名
  method: string;//网络请求方法
  showUploadList?: boolean | object; // 是否展示文件列表
  onChange?:  (file: UploadFile) => void ; // 上传文件改变时的状态
  onPreview?: (file: any) => void; // 点击文件链接或预览图标时的回调
  onRemove?: (file: any) => void | boolean | Promise<any>; // 点击移除文件时的回调，返回值为 false 时不移除
  openUploadFileDialogOnClick?: boolean; // 点击打开文件对话框
  transformUploadFile?: (file: UploadFile) => string | Blob | UploadFile | Promise<string | Blob | UploadFile>; // 支持自定义上传逻辑，该方法的返回值将会作为上传的文件
  onProgress?: (percent: number, file: UploadFile) => void; // 上传中的回调函数
}

//上传文件类型
export declare interface UploadFile extends File {
  percent: number;//上传进度
  name: string;//文件名
  url: string;//下载地址
  uid: number;//唯一标识符，不设置时会自动生成
  status: string;//上传状态，不同状态展示颜色也会有所不同 error | done | uploading | removed
  file: File;//文件对象
  avatarImgURL: string;//mode类型avatar时候头像地址
}


declare const Upload: React.FC<UploadProps>;

export default Upload;
