import React, {useEffect} from 'react';
import {Delete, Folder} from '../../../icon/icon.ts';
import style from '../../index.module.less'

const FileList = ({
                    selectedFile = [],
                    handleDelete = () => {
                    }
                  }) => {

  return <>
    {
      selectedFile.map((item, index) => <div className={style.fileListBox} key={index}>
          <Folder/>
          <span>{item.name}</span>
          <Delete onClick={() => handleDelete(item, index)} className={style.deleteIcon}/>
        </div>
      )
    }
  </>
}

export default FileList
