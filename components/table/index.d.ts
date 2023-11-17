import React, {ReactNode} from 'react';
import GroupTbody from "./components/gtoup-tbody/group-tbody";
import {ButtonProps} from "../button";


// 定义数据项的类型
export interface DataItem {
    key: string;

    [propName: string]: any;
}

// 定义列的类型
export interface Column {
    key: string;
    title: string;
    dataIndex: string;
    render?: (data: any, record: DataItem) => ReactNode;
}

export interface ColumnGroup {
    key: string;
    title: string;
    children: Column[]; //数组   集合
}


// 定义Table组件的属性类型
export interface TableProps {
    className?: string;// 样式类名
    data?: DataItem[];// 数据
    columns?: Column[];// 列数据
    draggable?: boolean;// 是否可拖拽
    onDdragAfter?: (data: DataItem[], column: Column[]) => void;// 拖拽后的回调
    expandable?: Expandable;
    tbodyClassName: string;
    theadClassNmae: string;
}

// 定义Column组件的属性类型
export interface ColumnProps {
    title: string;
    dataIndex: string;
    render?: (data: any, record: DataItem) => ReactNode;
    key?: string;
}

interface expandIconProps {
    expanded: boolean;
    record: number;
    onExpand: () => void;
}

/**
 * 定义展开组件的类型
 */
interface Expandable {
    expandedRowRender: () => React.FC | React.FC;// 展开的行内容
    onExpandChange: (expand: boolean) => void;//点击展开的回调
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

/**
 * 拖拽组件的属性类型
 */
export interface DraggableProps {
    draggable?: boolean;
    onDdragAfter?: (data: DataItem[], column: Column[]) => void;
    initialData?: DataItem[];
    initialColumns?: Column[];
}

/**
 * 分组组件的属性类型
 */
export interface GroupTbodyProps {
    tableColumns: Column[];
    item: DataItem[];
    activeTD: string | null;// 当前拖拽的列
}

declare const Table: React.FC<TableProps>;

export default Table;

// declare module 'Table' {
//     export function Table({data, columns}: TableProps): React.FC;
//
//     export function Column({title, dataIndex, render, key}: ColumnProps): null;
//
//     namespace Table {
//         export const Column: typeof Column;
//     }
// }
