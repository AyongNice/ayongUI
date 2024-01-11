import React from "react";
import selectStyle from '../../../../commo.module.less';
import {Wrong} from "../../../../../icon/icon.ts";

const Item = ({value, index, mode, deleteValue, handleOptionClick}) => {
  return <div key={value} className={selectStyle.item}>
    <span>{value}</span>
    <span
      onClick={() => handleOptionClick(value)}
    >
    <Wrong className={selectStyle.delete} onClick={(e) => deleteValue(e, index)}/>
  </span>
  </div>
}
export default Item;
