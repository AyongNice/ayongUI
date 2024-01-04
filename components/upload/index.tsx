import {useState, useRef} from "react";
import style from "./index.module.less";
import {UploadProps, UploadFile} from "./index.d";
import Button from "../button/index.tsx";
import {Uploads, Wrongs} from "../icon/icon.ts"
import Message from '../message/index.tsx'
import FileLsit from "./components/file-list/index.tsx";
import {isPromise, formatFileSize} from '../../utils/index.ts'
import '../../config/style.module.less'
import {trackUploadProgress} from "./fileUpload.ts";

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
  const fileLists = [...defaultFileList, ...fileList as UploadFile[]]
  const [selectedFile, setSelectedFile] = useState<UploadFile[]>(fileLists);
  const fileInputRef = useRef(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const handleButtonClick = () => {
    // 触发隐藏的文件选择按钮
    fileInputRef.current.click();
  };
  const monitorUploadProgress = (event) => {
    if (event.lengthComputable) {
      const percentCompleted = (event.loaded / event.total) * 100;
      setProgress(percentCompleted);
    }
  };
  const [key, setKey] = useState(0);

  const getFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleFileChange(event?.target?.files[0] as File);
  }
  /**
   * 处理文件上传
   * @param event
   */
  const handleFileChange = (file: File): Promise<void> => {
    return new Promise(async (resolve) => {
      /** 限制文件大小 **/
      if (maxFileSize && file.size / 1000 > maxFileSize) {
        //精确到maxFileSize小数点后两位 保留两位小数 都是00不要小数
        Message.warning({message: ` 文件超出${formatFileSize(maxFileSize) === 0 ? 1 : formatFileSize(maxFileSize)}M限制`})
        return beforeUpload(file as UploadFile)
      }
      /**
       * beforeUpload
       */
      try {
        const res = await isPromise(beforeUpload, file)
        if (!res) return;
      } catch (e) {

      }

      if (action) {
        try {
          await trackUploadProgress({
            action, name, file, progressCallback: (percent) => {
              setSelectedFile((prevState) => {
                return [...selectedFile, {file, percent, status: 'done', uid: Date.now()}];
              })
            }, headers, method, withCredentials
          })
        } catch (e) {
          setSelectedFile((prevState) => {
            return [...selectedFile, {file, status: 'error', uid: Date.now()}];
          })
        }
      } else {
        setSelectedFile((prevState) => {
          return [...selectedFile, {file, status: 'done', percent: '100%', uid: Date.now()}];
        })
      }
      console.log('selectedFile', selectedFile)
      // 将文件传递给父组件或执行其他上传逻辑
      onChange(file);
      // 通过更改 key 属性强制 React 重新渲染组件
      setKey((prevKey) => prevKey + 1);
      resolve();
    })

  };
  /**
   * 删除文件
   * @param index {number} 下标
   */
  const handleDelete = async (_item: File, index: number): Promise<void> => {

    try {
      const resRemove = await isPromise(onRemove, _item)
      if (resRemove) return;
    } catch (e) {

    }
    console.log()
    setDeleteIndex(() => index)
  }

  /**
   * 动画结束后删除文件
   * @param e
   * @param index
   */
  const onAnimationEnd = (e: React.AnimationEvent, index: number): void => {
    if (e.animationName === "fadeOutDown") {
      setSelectedFile((prevState: File[]) => {
        return prevState.filter((_: File, i: number): boolean => i !== index)
      })
      setDeleteIndex(null)
    }
  }


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    if (disabled) return;
    event.preventDefault();
    const fileList = Array.from(event.dataTransfer.files);
    console.log('Dropped files:', fileList);
    for (let i = 0; i < fileList.length; i++) {
      try {


        handleFileChange(fileList[i]);
      } catch (e) {

      }
      console.log('fileList[i]', fileList[i])
    }

  };

  // @ts-ignore
  return (<div className={className}
               onDragOver={handleDragOver}
               onDrop={handleDrop}>
    <input
      type="file"
      key={key}
      disabled={disabled}
      ref={fileInputRef}
      style={{display: 'none'}}
      onChange={getFile}
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
