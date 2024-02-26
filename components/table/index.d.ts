import React, {ReactNode} from 'react';
import GroupTbody from "./components/gtoup-tbody/group-tbody";
import {ButtonProps} from "../button/index.tsx";
import useDragDrop from "./draggable.ts";

interface expandIconProps {
  expanded: boolean;//当前展开状态 true展开;false关闭
  record: number;//当前展开下标
  onExpand: (record: number) => void;//必传字段用于动态改变icon状态
}

/**
 * 定义展开组件的类型
 */
interface Expandable {
  expandedRowRender: (item: DataItem) => React.FC | React.FC;// 展开的行内容
  onExpandChange: (index: number, state: boolean) => void;//点击展开的回调
  expandedRowKeys: string[];// 展开的行
  expandIcon: (props: expandIconProps) => ReactNode;// 展开的图标
}

/**
 * 定义展开组件组件的属性类型
 */
export interface UnfoldTdProps {
  expandable?: Expandable;
  ayonEexpandedRowKeys?: string[];
  index?: number;
  item?: DataItem;// 当前行的数据
  toggleExpand?: (key: string) => void;
}

//拖拽方法入参数
export interface DragDropParma {
  _tableColumns: Column[];
  data: DataItem[];
  draggable: boolean;
  onDragAfter: (data: DataItem[], column: Column[]) => void;
}

//拖拽方法返回参数
export interface UseDragDropRetunrn {
  tableColumns: Column[];
  tableData: DataItem[];
  activeTR: null | number;
  activeTD: null | string;
  hadleDragStart: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
  hadleDragStartData: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
  hadleDragOver: (e: React.DragEvent<HTMLTableRowElement>) => void;
  hadleDrop: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
  hadleDropData: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
}

/**
 * 拖拽方法入参数
 */
export interface DraggableProps {
  draggable?: boolean;
  onDdragAfter?: (data: DataItem[], column: Column[]) => void;
  initialData?: DataItem[];
  initialColumns?: Column[];
}
export interface CheckboxDataItem extends DataItem{
  disabled:boolean
}
/**
 * 分组组件的属性类型
 */
export interface GroupTbodyProps {
  tableColumns: Column[];
  item: DataItem[];
  activeTD: string | null;// 当前拖拽的列
  tbodyStyle: string;
}

// 定义数据项的类型
export interface DataItem {
  key: string;

  [propName: string]: any;
}

// 定义列的类型
export interface Column {
  key: string | number;
  title: string;
  dataIndex: string;
  render?: (data: any, record: DataItem) => ReactNode;
}

export interface ColumnGroup {
  key: string | number;
  title: string;
  children: React.ReactNode<Column[]>;//数组   集合
}

interface RowSelection {
  type: string;//选择类型
  onChange: Function;//选择变化
  getCheckboxProps: Function;//校验规则
}

// 定义Table组件的属性类型
export interface TableProps {
  className?: string;// 样式类名
  data?: DataItem[];// 数据
  columns?: Column[];// 列数据
  draggable?: boolean;// 是否可拖拽
  onDdragAfter?: (data: DataItem[], column: Column[]) => void;// 拖拽后的回调
  expandable?: Expandable;//扩展展开参数
  children?: React.ReactNode;// 子元素
  cellActiveClassName?: Function<string>;// 动态添加样式
  onDragAfter?: (data: DataItem[], column: Column[]) => void;// 拖拽后的回调
  rowSelection: RowSelection;
}

// 定义Column组件的属性类型
export interface ColumnProps {
  title: string;
  dataIndex: string;
  render?: (data: any, record: DataItem) => ReactNode;
  key?: string;
}


declare namespace Table {
  interface ColumnGroups extends ColumnGroup {
    // 定义 ColumnGroup 的属性
  }

  interface Columns extends Column {
    // 扩展 Column 接口，以支持 Table.ColumnGroup 和 Table.Column
  }

  export const ColumnGroup: React.FC<ColumnGroups>;
  export const Column: React.FC<Columns>;
}
declare const Table: React.FC<TableProps>;

export default Table;

