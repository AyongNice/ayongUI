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


  // 处理页标集
  const handlerPageArr = () => {
    const arr: PageList = []
    if (total <= 0) return
    let set = true;
    const max = Math.ceil(total / defaultPageSize)
    for (let i = 1; i <= max; i++) {

      if (max > 10) {

        if (i > 2 && i < max - 1) {
          if (set) {
            arr.push({lable: '...', index: i})
            set = false;
          } else {
            arr.push({lable: "", index: i})
          }

        } else {
          arr.push({lable: i, index: i})
        }

      } else {
        arr.push({lable: i, index: i})
      }

    }
    return arr;
  }

  const pageArr: number[] = useMemo(() => {
    return handlerPageArr();
  }, [total, defaultPageSize])


  const showJumpIndex = useMemo(() => {

    if (!selectedIndex || isNaN(selectedIndex)) {

      return ''
    }
    return selectedIndex
  }, [selectedIndex])

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
        label: `${item.toString()}条/页`,
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
    setSelectedIndex(prevState => --prevState)
  }
  const onNext = () => {
    if (disabled || selectedIndex === pageArr.length) return;
    setSelectedIndex(prevState => ++prevState)
  }
  const onBlur = (value) => {

    handlerCurrentPage(value)

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
    <div className={`${PaginationCss.prevBtn} ${disabled ? style.disabled : ""}`} onClick={onPrev}>
      <PreviousStep/>
    </div>
    <List total={total}
          defaultPageSize={defaultPageSize}
          handleCurrentPage={handleCurrentPage}
          selectedIndex={selectedIndex}
          disabled={disabled}/>
    {/*<div className={PaginationCss.pageNumList}>*/}

    {/*{pageArr.map((item: number, index: number) => item.lable ? <div*/}
    {/*    key={index}*/}
    {/*    className={pageNumItemName(item)}*/}
    {/*    onClick={() => handlerCurrentPage(item)}*/}
    {/*  >*/}
    {/*    <span>{item.lable}</span>*/}
    {/*  </div> : null*/}
    {/*)}*/}
    {/*</div>*/}
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
