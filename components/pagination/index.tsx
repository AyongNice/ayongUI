import {FC, memo, useState, useEffect, useMemo, useRef} from 'react'
import Select from '../select/index.tsx'
import Input from '../input/index.tsx'
import {Options} from '../select/index.d'
import {Advance, PreviousStep} from '../icon/icon'

import {PaginationProps, PageList} from './index.d'
import PaginationCss from './index.module.less'
import style from '../../config/style.module.less';
import List from './list/index.tsx'

let isSet = false;

const Pagination: FC<PaginationProps> = memo((props: PaginationProps) => {
  const {
    pageSize,
    current,
    total = 10,
    size = 'default',
    disabled = false,
    pageSizeOptions = [10, 20, 50, 100],
    showQuickJumper = false,
    showSizeChanger = false,
    hideOnSinglePage = false,
    onSizeChange = () => {

    },
    onCurrentChange = () => {

    },
  } = props

  const [defaultCurrent, setDefaultCurrent] = useState(current || 1)
  const [defaultPageSize, setDefaultPageSize] = useState(pageSize || pageSizeOptions[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState(1)

  const listRef = useRef(null)
  // 处理页标集
  const handlerPageArr = () => {
    const arr = [];
    const max = Math.ceil(total / defaultPageSize);
    for (let i = 1; i <= max; i++) {
      arr.push({label: i, index: i});
    }
    return arr;
  };

  const pageArr: { label: number; index: number }[] = useMemo(() => {
    return handlerPageArr();
  }, [total, defaultPageSize])


  // 设置当前页码
  const handleCurrentPage = (cur: any) => {

    console.log('handleCurrentPage', cur)
    if (disabled) return;
    setDefaultCurrent(Number(cur))
    setSelectedIndex(Number(cur))
    setCurrentPage(cur)
  }
  // 设置当前每页条数
  const handlerPageSize = (size: any) => {
    if (!size) return
    setDefaultPageSize(Number(size))

  }
  // 设置当前页码
  const onJumpPage = () => {
    setCurrentPage(defaultCurrent)
  }

  // 处理页码数据为selectOptions
  const handlerPageSizeSelectOptions = () => {
    return pageSizeOptions.reduce((prev: Options[], item) => {
      prev.push({
        label: `${item}条/页`,
        value: item,
      })
      return prev
    }, [])
  }

  const pageNumItemName = (item) => {
    let name = `${PaginationCss.pageNumItem} `
    if (disabled) {
      name += ` ${style.disabled} `
    }
    if (selectedIndex == item.index) {
      name += `  ${PaginationCss.selected}`
    }
    return name
  }


  /**
   * 分页前进后退
   */
  const onPrev = () => {
    if (disabled || selectedIndex === 1) return;
    setSelectedIndex(prevState => --prevState);
    listRef.current.handleSkipBackward(1)
  }
  const onNext = () => {
    if (disabled || selectedIndex === pageArr.length) return;
    setSelectedIndex(prevState => ++prevState);
    listRef.current.handleSkipForward(1)
  }
  const onBlur = (value) => {

    handlerCurrentPage(value)

  }
  const onChangeBefore = (value) => !value || isNaN(value) || value < 1 || value > pageArr.length;

  useEffect(() => {
    onCurrentChange(selectedIndex)
    console.log('selectedIndex', selectedIndex)
  }, [selectedIndex])

  useEffect(() => {
    onSizeChange(defaultPageSize)
  }, [defaultPageSize])

  const [abbreviationList, setAbbreviationList] = useState([])


  return hideOnSinglePage && pageArr.length <= 1 ? '' : <div className={`${PaginationCss.pageMain}`}>
    <div className={PaginationCss.total}></div>
    <div className={`${PaginationCss.prevBtn} ${disabled ? style.disabled : ""}`} onClick={onPrev}>
      <PreviousStep/>
    </div>
    <List
      ref={listRef}
      total={total}
      pageArr={pageArr}
      defaultPageSize={defaultPageSize}
      handleCurrentPage={handleCurrentPage}
      selectedIndex={selectedIndex}
      disabled={disabled}/>

    <div className={`${PaginationCss.nextBtn} ${disabled ? style.disabled : ""}`} onClick={onNext}>
      <Advance/>
    </div>
    {showSizeChanger && <Select
      disabled={disabled}
      onChange={handlerPageSize}
      className={PaginationCss.selectPageSize}
      options={handlerPageSizeSelectOptions()}
      defaultValue={defaultPageSize}
    />}

    {showQuickJumper && <div className={PaginationCss.jumpBox}>
      跳至
      <Input
        disabled={disabled}
        onChangeBefore={onChangeBefore}
        value={selectedIndex}
        className={PaginationCss.pageSizeInput}
        onBlur={onBlur}
      />
      页
    </div>}
  </div>
})

export default Pagination
