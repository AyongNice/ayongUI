import React from "react";
import selectStyle from '../../index.module.less';
import {Wrongs, Under, Search} from '../../../icon/icon.ts'

const LeftIcon = ({
                    search,
                    showClearable,
                    onClearValue,
                    isDropdownVisible,
                  }) => {


  return (
    <React.Fragment>

      {showClearable ? (
        <Wrongs onClick={(e) => {
          e.stopPropagation();
          onClearValue()
        }} className={selectStyle.icon}/>
      ) : search && isDropdownVisible ? (
        <Search className={selectStyle.icon}/>
      ) : (
        <Under
          className={`${selectStyle.icon} ${selectStyle.rotateTransform} ${
            isDropdownVisible ? selectStyle.rotate90 : ''
          }`}
        />
      )}
    </React.Fragment>

  )
}


export default LeftIcon;
