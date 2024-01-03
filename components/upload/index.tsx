import {useState, useRef} from "react";
import style from "./index.module.less";
import {UploadProps, UploadFile} from "./index.d";
import Button from "../button/index.tsx";
import {Uploads, Wrongs} from "../icon/icon.ts"
import Message from '../message/index.tsx'
import FileLsit from "./components/file-list/index.tsx";
import {isPromise, isURL} from '../../utils/index.ts'
import '../../config/style.module.less'

const getClassName = (disabled) => {
  return `${style.avatar}  ${disabled && 'disabled'}`
}

const templateMode = {
  'default': ({handleButtonClick, uplaodText, disabled}) => {
    return <Button disabled={disabled} onClick={handleButtonClick}><Uploads/> {uplaodText}
    </Button>
  },
  'avatar': ({handleButtonClick, disabled}) => {
    return <div onClick={handleButtonClick} className={getClassName(disabled)}>
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
                                         uplaodRender = null,
                                         iconRender = null,
                                         defaultFileList = [],
                                         fileList = [],
                                         fileListRender = null,
                                         action,
                                         method = 'POST',
                                         name = 'file',
                                         withCredentials = true,
                                         headers,
                                         beforeUpload = () => {
                                           return true
                                         },
                                         onRemove = () => {
                                           return false
                                         },
                                         onChange = () => {
                                         },
                                       }) => {
  const fileLists = [...defaultFileList, ...fileList]
  const [selectedFile, setSelectedFile] = useState<File[]>(fileLists);
  const fileInputRef = useRef(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const handleButtonClick = () => {
    // 触发隐藏的文件选择按钮
    fileInputRef.current.click();
  };


  /**
   * 处理文件上传j
   * @param event
   */
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = event.target.files[0];
    console.log(file.size, maxFileSize)
    if (maxFileSize && file.size / 1000 > maxFileSize) {
      //精确到maxFileSize小数点后两位 保留两位小数 都是00不要小数
      Message.warning({message: ` 文件超出${formatFileSize(file.size)}M限制`})
      return beforeUpload(file as UploadFile)
    }

    const res = await isPromise(beforeUpload, file)
    console.log('res', res)

    if (!res) return;

    const formData = new FormData();
    formData.append(name, file);
    console.log('action', action)
//
    if (isURL(action)) {
      await fetch(action as string, {
        method: method,
        body: formData,
        credentials: withCredentials ? 'include' : 'omit',
        headers
      })
      setSelectedFile((prevState) => {
        return [...selectedFile, file];
      })
    } else {
      setSelectedFile((prevState) => {
        return [...selectedFile, file];
      })
    }
    // 将文件传递给父组件或执行其他上传逻辑
    onChange(file);
  };
  /**
   * 删除文件
   * @param index {number} 下标
   */
  const handleDelete = async (_item: File, index: number): Promise<void> => {
    const resRemove = await isPromise(onRemove, _item)
    console.log('resRemove', resRemove)
    if (resRemove) return;
    setDeleteIndex(() => index)
  }

  /**
   * 动画结束后删除文件
   * @param e
   * @param index
   */
  const onAnimationEnd = (e: React.AnimationEvent, index: number): void => {
    console.log('e', e)
    if (e.animationName === "fadeOutDown") {
      setSelectedFile((prevState: File[]) => {
        return prevState.filter((_: File, i: number): boolean => i !== index)
      })
      setDeleteIndex(null)
    }
  }
  return (<div className={className}>
    <input
      disabled={disabled}
      type="file"
      ref={fileInputRef}
      style={{display: 'none'}}
      onChange={handleFileChange}
    />
    {typeof uplaodRender === 'function' ? uplaodRender(handleButtonClick) : templateMode[mode]({
      handleButtonClick,
      uplaodText,
      disabled
    })}
    <FileLsit
      selectedFile={selectedFile}
      deleteIndex={deleteIndex}
      iconRender={iconRender}
      fileListRender={fileListRender}
      onAnimationEnd={onAnimationEnd}
      handleDelete={handleDelete}
    />
  </div>)

}

export default Upload
