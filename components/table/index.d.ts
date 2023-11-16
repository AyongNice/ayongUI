import React, {ReactNode} from 'react';
import GroupTbody from "./components/gtoup-tbody/group-tbody";


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

interface Expandable {
    expandedRowRender: () => React.FC | React.FC;
    onExpand: () => void;
    expandedRowKeys: string[];
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

export interface UnfoldTdProps {
    expandable?: Expandable;
    ayonEexpandedRowKeys?: string[];
    index?: number;
    item?: DataItem;
    toggleExpand?: (key: string) => void;
}

export interface DraggableProps {
    draggable?: boolean;
    onDdragAfter?: (data: DataItem[], column: Column[]) => void;
    initialData?: DataItem[];
    initialColumns?: Column[];
}

export interface GroupTbodyProps {
    tableColumns: Column[];
    item: DataItem[];
    activeTD: string | null;
}

declare module 'Table' {
    export function Table({data, columns}: TableProps): React.FC;

    export function Column({title, dataIndex, render, key}: ColumnProps): null;

    namespace Table {
        export const Column: typeof Column;
    }
}
