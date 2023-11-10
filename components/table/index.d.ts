import React, {ReactNode} from 'react';


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
    children: Column[];
}

// 定义Table组件的属性类型
export interface TableProps {
    className?: string;// 样式类名
    data?: DataItem[];// 数据
    columns?: Column[];// 列数据
    draggable?: boolean;// 是否可拖拽
    onDdragAfter?: (data: DataItem[], column: Column[]) => void;// 拖拽后的回调
}

// 定义Column组件的属性类型
export interface ColumnProps {
    title: string;
    dataIndex: string;
    render?: (data: any, record: DataItem) => ReactNode;
    key?: string;
}

// declare const Table: React.FC<TableProps>;
// declare const  Column: React.FC<ColumnProps>;
// export default Table;
declare module 'Table' {
    export function Table({data, columns}: TableProps): React.FC;

    export function Column({title, dataIndex, render, key}: ColumnProps): null;

    namespace Table {
        export const Column: typeof Column;
    }
}
