import React, {useEffect} from 'react';
import {Delete, Folder} from '../../../icon/icon.ts';
import styleAvater from './index.module.less'
import {UploadFile} from '../../index.d'
import './index.less';

const AvatarList = ({
                      style,
                      selectedFile = [],
                      deleteIndex = [],
                      handleDelete = () => {
                      },
                      iconRender = () => {
                      },
                      onAnimationEnd = () => {

                      },
                      fileListRender = () => {
                      },
                      handleButtonClick = () => {
                      },
                    }) => {

  const getClassName = (index: number): string => {
    return `${styleAvater.avatar}  ${deleteIndex === index ? 'fileListItemExit' : ''}`
  }

  const handleImageChange = (file: File) => {
    return new Promise(resolve => {
      // 通过 FileReader 读取图片并将其转为 base64 编码
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result)
      };
      reader.readAsDataURL(file);
    })

  };

  return <div className={styleAvater.box}>

    {
      selectedFile.map((item: UploadFile, index: number) => {
          return typeof fileListRender === 'function' ? fileListRender(item, index, handleDelete) :
            <div onAnimationEnd={(e) => onAnimationEnd(e, index)}
                 style={style}
                 className={getClassName(index)}
                 key={index}>
              {typeof iconRender === 'function' ? iconRender() : <Folder className={styleAvater.iconSize}/>}
              <img src={item.avatarImgURL}/>
              <div className={styleAvater.deleteIconBox}/>
              <Delete onClick={() => handleDelete(item, index)} className={styleAvater.deleteIcon}/>

            </div>
        }
      )
    }
    <div style={style} className={styleAvater.avatar} onClick={handleButtonClick}>
      <span>+</span>
    </div>
  </div>
}

export default AvatarList
