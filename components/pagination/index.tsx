import {FC, memo, useState, useEffect, useMemo, useRef} from 'react'
import Select from '../select/index.tsx'
import Input from '../input/index.tsx'
import {Options} from '../select/index.d'
import {Advance, PreviousStep} from '../icon/icon'

import {PaginationProps, PageList} from './index.d'
import PaginationCss from './index.module.less'

const Pagination: FC<PaginationProps> = memo((props: PaginationProps) => {
  const {
    pageSize,
    current,
    total = 20,
    disabled = false,
    pageSizeOptions = [10, 20, 50, 100],
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
      setSelectedIndex(inputRef.current)
      return ''
    }
    return selectedIndex
  }, [selectedIndex])

  // 设置当前页码
  const handlerCurrentPage = (cur: any) => {
    console.log('跳转页码 ###', cur)
    setDefaultCurrent(Number(cur))
    setSelectedIndex(Number(cur))
    setCurrentPage(cur)
  }
  // 设置当前每页条数
  const handlerPageSize = (size: any) => {
    if (!size) return
    console.log('每页条数####', size)
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
    let name = `${PaginationCss.pageNumItem}`
    if (disabled) {
      name += ` ${PaginationCss.disabled}`
    }
    if (selectedIndex == i) {
      name += ` ${PaginationCss.selected}`
    }
    return name
  }


  /**
   * 分页前进后退
   */
  const onPrev = () => {
    if (selectedIndex === 1) return;
    setSelectedIndex(prevState => --prevState)
  }
  const onNext = () => {
    if (selectedIndex === pageArr.length) return;
    setSelectedIndex(prevState => ++prevState)
  }
  const onBlur = (value) => {
    inputRef.current = value;
    console.log(selectedIndex)
    // if (!value || isNaN(value)) {
    //   onBlurRef.current = true;
    //   return
    // }

    handlerCurrentPage(value)
    // inputRef.current.onRest()
  }
  const onChangeBefore = (value) => {
    if (!value || isNaN(value)) {
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
    <div className={PaginationCss.pageMain}>
      <div className={PaginationCss.total}></div>
      <div className={PaginationCss.prevBtn} onClick={onPrev}>
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
      <div className={PaginationCss.nextBtn} onClick={onNext}>
        <Advance/>
      </div>
      <Select
        onChange={handlerPageSize}
        className={PaginationCss.selectPageSize}
        options={handlerPageSizeSelectOptions()}
        defaultValue={10}
      />
      <div className={PaginationCss.jumpBox}>
        跳至
        <Input
          ref={inputRef}
          onChangeBefore={onChangeBefore}
          value={selectedIndex}
          className={PaginationCss.pageSizeInput}
          onBlur={onBlur}
        />
        页
      </div>
    </div>
  )
})

export default Pagination
