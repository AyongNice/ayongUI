import {useState, useRef} from "react";
import style from "./index.module.less";
import {UploadProps, UploadFile} from "./index.d";
import Button from "../button/index.tsx";
import {Uploads, Wrongs} from "../icon/icon.ts"
import Message from '../message/index.tsx'
import FileLsit from "./components/file-list/index.tsx";
import AvatarList from './components/avatar-list/index.tsx';
import {isPromise, formatFileSize, readAsDataURLImg} from '../../utils/index.ts'
import '../../config/style.module.less'
import {trackUploadProgress} from "./fileUpload.ts";

import messages from '../message/index.tsx'


const getClassName = (disabled) => {
  return `${style.avatar}  ${disabled && 'disabled'}`
}

const templateMode = {
  'default': ({handleButtonClick, uplaodText, disabled}) => {
    return <Button disabled={disabled} onClick={handleButtonClick}><Uploads/> {uplaodText}
    </Button>
  },
  'avatar': ({handleButtonClick, disabled}) => {
    return null
  },
  undefined: () => {
  }
}
const Upload: React.FC<UploadProps> = ({
                                         style = {},
                                         mode = 'default',
                                         className = '',
                                         uplaodText = '上传文件',
                                         maxFileSize = null,
                                         accept = '',
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
  const _style = {
    width: 86,
    height: 86,
    ...style
  }
  if (mode === 'avatar') {
    accept = 'image/jpeg, image/png'
  }
  //文件
  const fileLists = [...defaultFileList, ...fileList as UploadFile[]]
  //选择文件
  const [selectedFile, setSelectedFile] = useState<UploadFile[]>(fileLists);
  //input
  const fileInputRef = useRef(null);
  //删除索引
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  //input刷新key
  const [key, setKey] = useState(0);

  const handleButtonClick = () => {
    // 触发隐藏的文件选择按钮
    fileInputRef.current.click();
  };

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
      let avatarImgURL: string = ''
      try {
        if (mode === 'avatar') {
          console.log(file)
          if (!file.type.includes('image')) return messages.error({message: 'avatar模式下必须是图片类型'});
          const width = typeof _style.width === 'string' ? _style.width.replace('px', '') : _style.width;
          const height = typeof _style.height === 'string' ? _style.width.replace('px', '') : _style.height;
          avatarImgURL = await readAsDataURLImg(file, width, height);
        }
      } catch (e) {

      }
      let fileItme: UploadFile = {
        file,
        action: '',
        data: {},
        method,
        headers,
        avatarImgURL,
        name: file.name,
      }

      if (action) {
        try {
          await trackUploadProgress({
            action, name, file, progressCallback: (percent: number) => {
              fileItme = {...fileItme, percent, status: 'done', uid: Date.now()}
              setSelectedFile((prevState: UploadFile[]) => {
                if (maxCount === 1) return [fileItme];
                return [...prevState, fileItme];
              })
            }, headers, method, withCredentials
          })
        } catch (e) {
          fileItme = {...fileItme, status: 'error', uid: Date.now()}
          setSelectedFile((prevState: UploadFile[]) => {
            if (maxCount === 1) return [fileItme];
            return [...prevState, fileItme];
          })
        }
      } else {
        fileItme = {...fileItme, percent: 100, status: 'done', uid: Date.now()}
        setSelectedFile((prevState: UploadFile[]) => {
          if (maxCount === 1) return [fileItme];
          return [...prevState as UploadFile[], fileItme];
        })
      }
      // 将文件传递给父组件或执行其他上传逻辑
      onChange(fileItme);
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
    setDeleteIndex(() => index)
  }

  /**
   * 动画结束后删除文件
   * @param e
   * @param index
   */
  const onAnimationEnd = (e: React.AnimationEvent, index: number): void => {
    console.log('onAnimationEnd', e)
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
      accept={accept}
      style={{display: 'none'}}
      onChange={getFile}
    />
    {typeof uplaodRender === 'function' ? uplaodRender(handleButtonClick) : templateMode[mode]({
      handleButtonClick,
      uplaodText,
      disabled
    })}
    {
      mode === 'avatar' ? <AvatarList
        style={_style}
        selectedFile={selectedFile}
        deleteIndex={deleteIndex}
        iconRender={iconRender}
        handleButtonClick={handleButtonClick}
        fileListRender={fileListRender}
        onAnimationEnd={onAnimationEnd}
        handleDelete={handleDelete}/> : <FileLsit
        selectedFile={selectedFile}
        deleteIndex={deleteIndex}
        iconRender={iconRender}
        fileListRender={fileListRender}
        onAnimationEnd={onAnimationEnd}
        handleDelete={handleDelete}
      />
    }

  </div>)

}

export default Upload
