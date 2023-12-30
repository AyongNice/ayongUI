import {useState, useRef} from "react";
import style from "./index.module.less";
import {UploadProps} from "./index.d";
import Button from "../button/index.tsx";
import {Uploads, Wrongs} from "../icon/icon.ts"
import Message from '../message/index.tsx'
import FileLsit from "./components/file-list/index.tsx";

const getClassName = (className) => {
  return `${style.avatar} ${className}`
}

const templateMode = {
  'default': (handleButtonClick: Function, className: string, uplaodText) => {
    return <Button className={className} onClick={handleButtonClick}><Uploads/> {uplaodText}</Button>
  },
  'avatar': (handleButtonClick: Function, className: string) => {
    return <div onClick={handleButtonClick} className={getClassName(className)}>
      <span>+</span>
    </div>
  },
  undefined: () => {
  }
}
const formatFileSize = (sizeInBytes) => {
  // 将字节数转换为兆字节，并精确到小数点后两位
  const sizeInMegabytes = sizeInBytes / (1024 * 1024);
  const formattedSize = sizeInMegabytes.toFixed(2);

  // 移除小数部分中的尾随0
  const finalSize = formattedSize.replace(/\.?0*$/, '');

  return finalSize;
};

const Upload: React.FC<UploadProps> = ({
                                         mode = 'default',
                                         className = '',
                                         uplaodText = '上传文件',
                                         maxFileSize = null,
                                         accept = 'image/*',
                                         multiple = false,
                                         disabled = false,
                                         maxCount = null,
                                         iconRender = null,
                                         beforeUpload = () => {
                                           return true
                                         },
                                         fileList = [],
                                         uplaodRender = null,
                                         onChange = () => {
                                         },
                                       }) => {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // 触发隐藏的文件选择按钮
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file.size, maxFileSize)
    if (maxFileSize && file.size / 1000 > maxFileSize) {

      //精确到maxFileSize小数点后两位 保留两位小数 都是00不要小数

      Message.warning({message: ` 文件超出${formatFileSize(file.size)}M限制`})
      return beforeUpload(file)
    }
    //判断 是否Promise类型
    if (beforeUpload() instanceof Promise) {
      const res = await beforeUpload(file)
      if (!res) return;
    } else {
      if (!beforeUpload(file)) return;
    }
    console.log('-------upload-----');
    setSelectedFile((prevState) => {
      return [...selectedFile, file];
    })
    // 将文件传递给父组件或执行其他上传逻辑
    onChange(file);
  };


  return (<>
    <input
      type="file"
      ref={fileInputRef}
      style={{display: 'none'}}
      onChange={handleFileChange}
    />
    {typeof uplaodRender === 'function' ? uplaodRender(handleButtonClick) : templateMode[mode](handleButtonClick, className, uplaodText)}
    <FileLsit selectedFile={selectedFile}/>
  </>)

}

export default Upload
