import React, {useState} from "react";
import table from './index.module.less'
import {TableProps, Column, DataItem} from "./index";

// console.log(table)

function Table({columns, children, data, className}: TableProps) {

    let _tableColumns: Column[] = [];

    // 从props传递的columns或者通过<Table.Column>定义的列都可以使用
    if (columns) {
        _tableColumns = columns;
    } else if (children) {
        _tableColumns = React.Children.map(children, (child) => {
            if (child.type.name === 'Column') {
                return {
                    title: child.props.title,
                    dataIndex: child.props.dataIndex,
                    render: child.props.render,
                    key: child.key,
                };
            }
        });
    }
    const [tableColumns, setTableColumns] = useState<Column[]>(_tableColumns);
    const [tableData, setTableData] = useState<DataItem[]>(data as DataItem[]);

    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        e.dataTransfer.setData('sourceIndex', index);
    };
    const handleDragStartData = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        e.dataTransfer.setData('sourceIndexData', index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        const sourceIndex: number = parseInt(e.dataTransfer.getData('sourceIndex'));
        const newColumns: Column[] = [...tableColumns];
        const [movedColumn] = newColumns.splice(sourceIndex, 1);
        newColumns.splice(index, 0, movedColumn);
        setTableColumns(newColumns);
    };

    const handleDropData = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        const sourceIndex: number = parseInt(e.dataTransfer.getData('sourceIndexData'));
        const newTableData: DataItem[] = [...tableData];
        const [movedTableData] = newTableData.splice(sourceIndex, 1);
        newTableData.splice(index, 0, movedTableData);
        setTableData(newTableData);
    };

    const styleClassName: string = `${table.table} ${className} `;

    return (
        <table className={styleClassName}>
            <thead>
            <tr>
                {tableColumns.map((column: Column, index: number) => (
                    <th
                        key={column.key}
                        draggable
                        onDragStart={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragStart(e, index)}
                        onDragOver={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragOver(e, index)}
                        onDrop={(e: React.DragEvent<HTMLTableRowElement>,) => handleDrop(e, index)}
                    >
                        {column.title}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {tableData.map((item: DataItem, index: number) => (
                <tr key={item.key}
                    draggable
                    onDragStart={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragStartData(e, index)}
                    onDragOver={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragOver(e, index)}
                    onDrop={(e: React.DragEvent<HTMLTableRowElement>,) => handleDropData(e, index)}
                >
                    {tableColumns.map((column: Column) => (
                        <td key={column.key}
                        >
                            {column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function Column({title, dataIndex, render}) {
    return null; // 列定义不需要在这里渲染
}

Table.Column = Column;

export default Table;

