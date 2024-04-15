import React, {useState, useMemo, useImperativeHandle, useEffect} from 'react';
import PaginationCss from '.././index.module.less';
import style from '../../../config/style.module.less';

import {Doubleleft, Doubleright} from '../../icon/icon.ts';

const List = React.forwardRef(({
                                 total,
                                 styleSzie,
                                 pageArr,
                                 defaultPageSize,
                                 disabled,
                                 selectedIndex,
                                 handleCurrentPage,
                                 onPrev,
                                 onNext
                               }, ref) => {
  const [currentPage, setCurrentPage] = useState(10);

  const pageNumItemName = (page) => {
    let name = PaginationCss.pageNumItem;
    if (disabled) {
      name += ` ${style.disabled}`;
    }
    if (selectedIndex === page.index) {
      name += ` ${PaginationCss.selected}`;
    }
    return name;
  };

  const handleSkipForward = () => {
    const newCurrentPage = currentPage + 1;
    const maxPage = Math.ceil(total / defaultPageSize);
    if (newCurrentPage + 2 <= maxPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleSkipBackward = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

 

  useImperativeHandle(ref, () => ({handleSkipForward, handleSkipBackward}))
  const renderPageNumbers = () => {
    if (pageArr.length <= 10) {
      return pageArr.map((page) => (
        <div
          key={page.index}
          style={styleSzie}
          className={pageNumItemName(page)}
          onClick={() => handleCurrentPage(page.index)}
        >
          <span>{page.label}</span>
        </div>
      ));
    } else {

      // 计算页面范围
      let startPage = Math.max(1, currentPage - 3);
      let endPage = Math.min(pageArr.length, currentPage + 2);

      // 如果当前选中的页码不在当前范围内，则调整范围
      if (selectedIndex < startPage || selectedIndex > endPage) {
        startPage = Math.max(1, selectedIndex - 2);
        endPage = Math.min(pageArr.length, selectedIndex + 3);
      }

      const visiblePages = pageArr.slice(startPage - 1, endPage);


      return (
        <>
          {visiblePages[0]?.label !== 1 && (
            <>

              <div style={styleSzie} className={pageNumItemName({index: 1})} onClick={() => handleCurrentPage(1)}>1
              </div>
              {currentPage > 6 && <div className={PaginationCss.rightNext}>
                <span className={PaginationCss.booth}> ...</span>
                <span className={PaginationCss.arrowhead}> <Doubleleft onClick={() => onPrev(3)}/></span>
              </div>}
            </>
          )}

          {visiblePages.map((page) => (
            <div
              style={styleSzie}
              key={page.index}
              className={pageNumItemName(page)}
              onClick={() => handleCurrentPage(page.index)}
            >
              <span>{page.label}</span>
            </div>
          ))}

          {visiblePages[visiblePages.length - 1]?.label !== pageArr.length && (
            <>
              {selectedIndex <= pageArr.length - 5 && <div style={styleSzie} className={PaginationCss.rightNext}>
                <span className={PaginationCss.booth}> ...</span>
                <span className={PaginationCss.arrowhead}>  <Doubleright
                  onClick={() => onNext(3)}/></span>
              </div>}

              <div className={pageNumItemName({index: pageArr.length})}
                   onClick={() => handleCurrentPage(pageArr.length)}>
                {pageArr.length}
              </div>
            </>
          )}
        </>
      );
    }
  };

  return <div className={PaginationCss.pageNumList}>{renderPageNumbers()}</div>;
});

export default List;
