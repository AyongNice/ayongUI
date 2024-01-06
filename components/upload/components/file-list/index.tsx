import React from 'react';
import {Delete, Folder} from '../../../icon/icon.ts';
import style from './index.module.less'
import {UploadFile} from '../../index.d'
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

  const getClassName = (item: UploadFile, index: number,): string => {
    console.log('item', item)
    return `${style.fileListItem} ${item.status === 'error' ? style.fileListErrorItem : ''}  ${deleteIndex === index ? 'fileListItemExit' : ''}`
  }
  return <div className={style.box}>
    {
      selectedFile.map((item: UploadFile, index: number) => {
          return typeof fileListRender === 'function' ? fileListRender(item, index, handleDelete) :
            <div onAnimationEnd={(e) => onAnimationEnd(e, index)}
                 className={getClassName(item, index)}
                 key={index}>
              <dd>
                {typeof iconRender === 'function' ? iconRender() :
                  <Folder className={`${style.iconSize} ${item.status === 'error' ? style.fileListErrorItem : ''}`}/>}
                <span>{item.name}</span>
                <Delete onClick={() => handleDelete(item, index)}
                        className={`${style.deleteIcon} ${item.status === 'error' ? style.fileListErrorItem : ''}`}/>
              </dd>

              {item.status === 'done' && item.percent !== 100 &&
                <progress className={style.progress} value={item.percent} max="100"/>}
            </div>
        }
      )
    }
  </div>
}

export default FileList
