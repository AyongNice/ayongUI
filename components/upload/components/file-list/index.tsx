import React, {useEffect} from 'react';
import {Delete, Folder} from '../../../icon/icon.ts';
import style from './index.module.less'
import './index.less';

const FileList = ({
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
                  }) => {

  const getClassName = (index: number): string => {
    return `${style.fileListItem}  ${deleteIndex === index ? 'fileListItemExit' : ''}`
  }
  return <div className={style.box}>
    {
      selectedFile.map((item, index) => {
          return typeof fileListRender === 'function' ? fileListRender(item, index, handleDelete) :
            <div onAnimationEnd={(e) => onAnimationEnd(e, index)}
                 className={getClassName(index)}
                 key={index}>
              {typeof iconRender === 'function' ? iconRender() : <Folder className={style.iconSize}/>}
              <span>{item?.file?.name}</span>
              <Delete onClick={() => handleDelete(item, index)} className={style.deleteIcon}/>
              <progress value={item.percent} max="100"/>
            </div>
        }
      )
    }
  </div>
}

export default FileList
