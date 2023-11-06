import {ReactNode} from 'react';

// 定义数据项的类型
interface DataItem {
    key: string;
    age: number;
    address: string;
    tags: string[];
}

// 定义列的类型
interface Column {
    key: string;
    title: string;
    dataIndex: string;
    render?: (data: any, record: DataItem) => ReactNode;
}

// 定义Table组件的属性类型
interface TableProps {
    className?: string;// 样式类名
    data?: DataItem[];// 数据
    columns?: Column[];// 列数据
}

// 定义Column组件的属性类型
interface ColumnProps {
    title: string;
    dataIndex: string;
    render?: (data: any, record: DataItem) => ReactNode;
    key?: string;
}

declare module 'your-component-library' {
    export function Table({data, columns}: TableProps): JSX.Element;

    export function Column({title, dataIndex, render, key}: ColumnProps): null;

    namespace Table {
        export const Column: typeof Column;
    }
}
