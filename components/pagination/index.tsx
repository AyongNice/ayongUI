import {FC, memo, useState, useEffect, useMemo, useRef} from 'react'
import Select from '../select/index.tsx'
import Input from '../input/index.tsx'
import {Options} from '../select/index.d'
import {Advance, PreviousStep} from '../icon/icon'

import {PaginationProps, PageList} from './index.d'
import PaginationCss from './index.module.less'
import style from '../../config/style.module.less'
const Pagination: FC<PaginationProps> = memo((props: PaginationProps) => {
  const {
    pageSize,
    current,
    total = 20,
    disabled = false,
    pageSizeOptions = [10, 20, 50, 100],
    showQuickJumper=false,
    showSizeChanger=false,
    onSizeChange = () => {

    },
    onCurrentChange = () => {

    },
  } = props

  const [defaultCurrent, setDefaultCurrent] = useState(current || 1)
  const [defaultPageSize, setDefaultPageSize] = useState(pageSize || 10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState(1)


  // 处理页标集
  const handlerPageArr = () => {
    const arr: PageList = []
    if (total <= 0) return
    const max = Math.ceil(total / defaultPageSize)
    for (let i = 1; i <= max; i++) {
      arr.push(i)
    }
    return arr;
  }

  const pageArr = useMemo(() => {
    return handlerPageArr();
  }, [total, defaultPageSize])

  const onBlurRef = useRef(false)
  const inputRef = useRef(null)
  useEffect(() => {
    onBlurRef.current = selectedIndex;
  }, [])


  const showJumpIndex = useMemo(() => {

    if (onBlurRef.current) {
      return
    }
    if (!selectedIndex || isNaN(selectedIndex)) {
      onBlurRef.current = true;
      console.log('inputRef.current',inputRef.current)
      setSelectedIndex(inputRef.current)
      return ''
    }
    return selectedIndex
  }, [selectedIndex])

  // 设置当前页码
  const handlerCurrentPage = (cur: any) => {
    if(disabled)return;
    console.log('跳转页码 ###', cur)
    setDefaultCurrent(Number(cur))
    setSelectedIndex(Number(cur))
    setCurrentPage(cur)
  }
  // 设置当前每页条数
  const handlerPageSize = (size: any) => {
    if (!size) return
    // console.log('每页条数####', size)
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

  const pageNumItemName = (i: number = 0) => {
    let name = `${PaginationCss.pageNumItem} `
    if (disabled) {
      name += ` ${style.disabled} `
    }
    if (selectedIndex == i) {
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
  const onChangeBefore = (value) => {
    if (!value || isNaN(value) ||value<1 || value > pageArr.length) {
      console.log(value)
      return false
    }
    return true
  }
  useEffect(() => {
    onCurrentChange(selectedIndex)
  }, [selectedIndex])

  useEffect(() => {
    onSizeChange(defaultPageSize)
  }, [defaultPageSize])


  return (
    <div className={`${PaginationCss.pageMain}` }>
      <div className={PaginationCss.total}></div>
      <div className={`${PaginationCss.prevBtn} ${disabled ? style.disabled:""}`} onClick={onPrev}>
        <PreviousStep/>
      </div>
      <div className={PaginationCss.pageNumList}>
        {pageArr.map((item, index) => (
          <div
            key={index}
            className={pageNumItemName(item)}
            onClick={() => handlerCurrentPage(item)}
          >
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className={`${PaginationCss.nextBtn} ${disabled ? style.disabled:""}`} onClick={onNext}>
        <Advance/>
      </div>
      {showSizeChanger && <Select
          disabled={disabled}
          onChange={handlerPageSize}
          className={PaginationCss.selectPageSize}
          options={handlerPageSizeSelectOptions()}
          defaultValue={10}
      />}

      {showQuickJumper &&  <div className={PaginationCss.jumpBox}>
        跳至
        <Input
            ref={inputRef}
            disabled={disabled}
            onChangeBefore={onChangeBefore}
            value={selectedIndex}
            className={PaginationCss.pageSizeInput}
            onBlur={onBlur}
        />
        页
      </div>}

    </div>
  )
})

export default Pagination
