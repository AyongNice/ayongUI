import React from "react";
import selectStyle from './index.module.less';
import {Wrongs, Under, Search} from '../../../icon/icon.ts'

const Single = ({
                  selectedValues,
                }) => {
  const isEmntyValue = (value: string | number): string | number => {
    if (value === 0) return value
    return value ?? '请选择'
  }
  return <div className={selectStyle.selectValue}>
    {isEmntyValue(selectedValues)}
  </div>
}


export default Single;
