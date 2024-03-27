import React, {useState, useMemo, useImperativeHandle, useEffect} from 'react';
import PaginationCss from '.././index.module.less';
import style from '../../../config/style.module.less';

import {Doubleleft, Doubleright} from '../../icon/icon.ts';

const List = React.forwardRef(({total, pageArr, defaultPageSize, disabled, selectedIndex, handleCurrentPage}, ref) => {
  const [currentPage, setCurrentPage] = useState(1);


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

  const handleSkipForward = (num: number = 3) => {
    if (currentPage < pageArr.length - 5) {
      console.log(num)
      setCurrentPage(currentPage + num);
    }
  };

  const handleSkipBackward = (num: number = 3) => {
    if (currentPage > 6) {
      console.log(num)
      setCurrentPage(currentPage - num);
    }
  };

  useEffect(() => {
    console.log(pageArr)
  }, [pageArr])

  useImperativeHandle(ref, () => ({handleSkipForward, handleSkipBackward}))
  const renderPageNumbers = () => {
    if (pageArr.length <= 10) {
      return pageArr.map((page) => (
        <div
          key={page.index}
          className={pageNumItemName(page)}
          onClick={() => handleCurrentPage(page.index)}
        >
          <span>{page.label}</span>
        </div>
      ));
    } else {
      console.log('currentPage', currentPage)
      const visiblePages = pageArr.slice(
        currentPage <= 6 ? 0 : currentPage - 3,
        currentPage === pageArr.length - 5 ? pageArr.length : currentPage + 2
      );

      return (
        <>
          {visiblePages[0]?.label !== 1 && (
            <>

              <div className={pageNumItemName({index: 1})} onClick={() => handleCurrentPage(1)}>1</div>
              {currentPage > 6 && <div className={PaginationCss.rightNext}>
                <span className={PaginationCss.booth}> ...</span>
                <span className={PaginationCss.arrowhead}> <Doubleleft onClick={() => handleSkipBackward(3)}/></span>
              </div>}
            </>
          )}

          {visiblePages.map((page) => (
            <div
              key={page.index}
              className={pageNumItemName(page)}
              onClick={() => handleCurrentPage(page.index)}
            >
              <span>{page.label}</span>
            </div>
          ))}

          {visiblePages[visiblePages.length - 1]?.label !== pageArr.length && (
            <>
              {currentPage < pageArr.length - 5 && <div className={PaginationCss.rightNext}>
                <span className={PaginationCss.booth}> ...</span>
                <span className={PaginationCss.arrowhead}>  <Doubleright onClick={() => handleSkipForward(3)}/></span>
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
