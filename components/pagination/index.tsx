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
    onSizeChange = (pageSize: number) => {

    },
    onCurrentChange = (pageNo: number) => {

    },
  } = props

  const paddingMode: { default: string; small: string } = {
    'default': {padding: '6px 13px', fontSize: '14px'},
    'small': {padding: '2px 8px', fontSize: '14px'},
  }
  const paddingArrowheadMode: { default: string; small: string } = {
    'default': {padding: '8px 9px', fontSize: '12px'},
    'small': {padding: '4px 5px', fontSize: '12px'},
  }
  const [defaultCurrent, setDefaultCurrent] = useState<number>(current || 1)
  const [defaultPageSize, setDefaultPageSize] = useState<number>(pageSize || pageSizeOptions[0])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedIndex, setSelectedIndex] = useState<number>(1)

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


  /**
   *
   * @param item
   */
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
  }
  const onNext = () => {
    if (disabled || selectedIndex === pageArr.length) return;
    setSelectedIndex(prevState => ++prevState);
  }
  const onBlur = (value: number) => {
    handleCurrentPage(value)
  }
  const onChangeBefore = (value) => !value || isNaN(value) || value < 1 || value > pageArr.length;

  useEffect(() => {
    onCurrentChange(selectedIndex)
  }, [selectedIndex])

  useEffect(() => {
    onSizeChange(defaultPageSize)
  }, [defaultPageSize])

  const [abbreviationList, setAbbreviationList] = useState([])


  return hideOnSinglePage && pageArr.length <= 1 ? '' : <div className={`${PaginationCss.pageMain}`}>
    <div className={PaginationCss.total}></div>
    <div style={paddingArrowheadMode[size]}
         className={`${PaginationCss.prevBtn} ${disabled ? style.disabled : ""}`}
         onClick={onPrev}>
      <PreviousStep/>
    </div>
    <List
      ref={listRef}
      total={total}
      styleSzie={paddingMode[size]}
      onPrev={onPrev}
      onNext={onNext}
      pageArr={pageArr}
      defaultPageSize={defaultPageSize}
      handleCurrentPage={handleCurrentPage}
      selectedIndex={selectedIndex}
      disabled={disabled}/>

    <div style={paddingArrowheadMode[size]}
         className={`${PaginationCss.nextBtn} ${disabled ? style.disabled : ""}`}
         onClick={onNext}>
      <Advance/>
    </div>
    {showSizeChanger && <Select
      disabled={disabled}
      style={{padding: paddingMode[size]}}
      onChange={handlerPageSize}
      className={PaginationCss.selectPageSize}
      options={handlerPageSizeSelectOptions()}
      defaultValue={defaultPageSize}
    />}

    {showQuickJumper && <div className={PaginationCss.jumpBox}>
      跳至
      <Input
        style={{padding: paddingMode[size]}}
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
