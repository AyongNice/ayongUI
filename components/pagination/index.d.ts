
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
  onChange?: () => number
}