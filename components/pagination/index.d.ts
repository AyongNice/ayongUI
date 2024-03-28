// 页标数据
import React from "react";

export type PageList = number[]

/**
 * 页码组件数据集
 */
export interface PaginationProps {
  total?: number//总数
  current: number //当前页
  pageSize?: number//每页条数
  disabled?: boolean//  是否禁用
  showJumpInput?: boolean//是否显示跳转输入框
  showSizeChanger?: boolean//是否显示每页条数选择器
  hideOnSinglePage?: boolean//只有一页时是否隐藏
  pageSizeOptions?: string[] | number[]//每页条数选择器可选值
  onChange?: (pageNo: number) => void//页码变化回调
  size?: string;//大小
  showQuickJumper?: boolean//是否显示跳转
  onSizeChange: (pageSize: number) => void//大小变化回调
  onCurrentChange: (pageNo: number) => void//大小变化回调
}


declare const Pagination: React.FC<PaginationProps>;

export default Pagination;


