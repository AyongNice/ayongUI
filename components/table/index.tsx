import React from "react";
import table from './index.module.less'
import {TableProps, Column, DataItem} from "./table";

// console.log(table)

function Table({columns, children, data, className}: TableProps) {
    let tableColumns: Column[] = [];

    // 从props传递的columns或者通过<Table.Column>定义的列都可以使用
    if (columns) {
        tableColumns = columns;
    } else if (children) {
        tableColumns = React.Children.map(children, (child) => {
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
    const styleClassName: string = `${table.table} ${className} `;

    return (
        <table className={styleClassName}>
            <thead>
            <tr>
                {tableColumns.map((column: Column) => (
                    <th key={column.key}>{column.title}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item: DataItem) => (
                <tr key={item.key}>
                    {tableColumns.map((column: Column) => (
                        <td key={column.key}>
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

