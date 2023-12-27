import { FC, memo, useState, useEffect } from 'react'
import Select from '../select'
import Input from '../input'
import { Options } from '../select/index.d'
import { Advance, PreviousStep } from '../icon/icon'

import { PaginationProps, PageList } from './index.d'
import PaginationCss from './index.module.less'

const Pagination: FC<PaginationProps> = memo((props: PaginationProps) => {
  const {
    pageSize,
    current,
    total = 20,
    disabled = false,
    pageSizeOptions = [10, 20, 50, 100],
  } = props

  const [pageArr, setPageArr] = useState<PageList>([1])
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
    setPageArr(arr)
  }

  // 设置当前页码
  const handlerCurrentPage = (cur: any) => {
    console.log('跳转页码 ###', cur)
    setDefaultCurrent(Number(cur))
    setSelectedIndex(Number(cur))
  }
  // 设置当前每页条数
  const handlerPageSize = (size: any) => {
    if (!size) return
    console.log('每页条数####', size)
    setDefaultPageSize(Number(size))
  }
  // 设置当前页码
  const onJumpPage = () => {
    console.log('onJumpPage')
    setCurrentPage(defaultCurrent)
  }

  // 处理页码数据为selectOptions
  const handlerPageSizeSelectOptions = () => {
    return pageSizeOptions.reduce((prev: Options[], item) => {
      prev.push({
        label: `${item.toString()}条/页`,
        value: item.toString(),
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

  useEffect(() => {
    handlerPageArr()
  }, [total])

  return (
    <div className={PaginationCss.pageMain}>
      <div className={PaginationCss.total}></div>
      <div className={PaginationCss.prevBtn}>
        <PreviousStep />
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
      <div className={PaginationCss.nextBtn}>
        <Advance />
      </div>
      <Select
        onChange={handlerPageSize}
        className={PaginationCss.selectPageSize}
        options={handlerPageSizeSelectOptions()}
        defaultValue={defaultPageSize?.toString() + '条/页'}
      />
      <div className={PaginationCss.jumpBox}>
        跳至
        <Input
          value={defaultCurrent.toString()}
          className={PaginationCss.pageSizeInput}
          onChange={(event: { target: { value: any } }) => handlerCurrentPage(event?.target.value)}
        />
        页
      </div>
    </div>
  )
})

export default Pagination
