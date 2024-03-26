
// 页标数据
export type PageList = number[]

/**
 * 页码组件数据集
 */
export interface PaginationProps {
  total?: number
  current: number
  pageSize?: number
  disabled?: boolean
  showJumpInput?: boolean
  showSizeChanger?: boolean
  hideOnSinglePage?: boolean
  pageSizeOptions?: string[]|number[]
  onChange?: (pageNo:number) => void
  size:string;//大小
  showQuickJumper?: boolean//是否显示跳转
  onSizeChange:(pageSize:number) => void//大小变化回调
}
