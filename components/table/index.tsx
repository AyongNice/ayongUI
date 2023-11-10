import React, {useState} from "react";
import table from './index.module.less'
import {TableProps, Column, DataItem, ColumnGroup} from "./index";
import ConditionalRender from "../conditional-render/conditional-render.tsx";

// console.log(table)
function renderSubHeaders(columns: Column[]) {
    console.log('columns', columns)
    return (
        <>
            {columns.map((column: Column) => (
                <th key={column.key}>
                    {column.title}
                </th>
            ))}
        </>
    );
}

function Table({
                   columns, children, data, className, draggable = false, onDdragAfter = () => {
    }
               }: TableProps) {

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
            if (child.type.name === 'ColumnGroup') {
                // 递归处理 ColumnGroup 中的列信息
                return {
                    title: child.props.title,
                    type: 'columnGroup',
                    children: React.Children.map(child.props.children, (columnChild) => {
                        if (columnChild.type.name === 'Column') {
                            return {
                                title: columnChild.props.title,
                                dataIndex: columnChild.props.dataIndex,
                                render: columnChild.props.render,
                                key: columnChild.key,
                            };
                        }
                        return null;
                    }).filter(Boolean), // 过滤掉 null
                    key: child.key,
                };
            }
        });
    }
    const [tableColumns, setTableColumns] = useState<Column[]>(_tableColumns);
    const [tableData, setTableData] = useState<DataItem[]>(data as DataItem[]);
    const [activeTR, setActiveTR] = useState<null | number>(null);
    const [activeTD, setActiveTD] = useState<null | string>(null);
    console.log('tableColumns', tableColumns)
    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        setActiveTD(tableColumns[index].dataIndex);
        e.dataTransfer.setData('sourceIndex', String(index));
    };
    const handleDragStartData = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        setActiveTR(index);
        e.dataTransfer.setData('sourceIndexData', String(index));
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        e.preventDefault();

    };

    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        setActiveTD(null);
        const sourceIndex: number = parseInt(e.dataTransfer.getData('sourceIndex'));
        const newColumns: Column[] = [...tableColumns];
        const [movedColumn] = newColumns.splice(sourceIndex, 1);
        newColumns.splice(index, 0, movedColumn);
        setTableColumns(newColumns);
        onDdragAfter(newColumns, tableData)
    };

    const handleDropData = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
        if (!draggable) return;
        setActiveTR(null);
        const sourceIndex: number = parseInt(e.dataTransfer.getData('sourceIndexData'));
        const newTableData: DataItem[] = [...tableData];
        const [movedTableData] = newTableData.splice(sourceIndex, 1);
        newTableData.splice(index, 0, movedTableData);
        setTableData(newTableData);
        onDdragAfter(newTableData, tableColumns)
    };

    const styleClassName: string = `${table.table} ${className} `;

    return (
        <table className={styleClassName}>
            <thead>
            <tr>
                {tableColumns.map((column: Column | ColumnGroup, index: number) => (
                    <React.Fragment key={column.key}>
                        {column.type === 'columnGroup' && (
                            // 如果是列分组，则递归渲染子级表头
                            <>
                                <th colSpan={(column as ColumnGroup).children.length}>
                                    {column.title}
                                </th>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </tr>
            <tr>
                {tableColumns.map((column: Column | ColumnGroup, index: number) => (
                    <React.Fragment key={column.key}>
                        {column.type === 'columnGroup' ?
                            // 如果是列分组，则递归渲染子级表头
                            <React.Fragment>
                                {renderSubHeaders((column as ColumnGroup).children, (column as ColumnGroup).children.length)}
                            </React.Fragment>
                            : <th
                                draggable={draggable}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                {column.title}
                            </th>}


                    </React.Fragment>
                ))}
            </tr>

            </thead>
            <tbody>
            <ConditionalRender mode='if' show={tableData.length !== 0}>
                <ConditionalRender mode='if' show={tableData.length !== 0}>
                    {tableData.map((item: DataItem, index: number) => (
                        <tr
                            key={item.key}
                            draggable={draggable}
                            className={activeTR === index ? table.aticve : ''}
                            onDragStart={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragStartData(e, index)}
                            onDragOver={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragOver(e, index)}
                            onDrop={(e: React.DragEvent<HTMLTableRowElement>,) => handleDropData(e, index)}
                        >
                            {tableColumns.map((column: Column | ColumnGroup) => (
                                <React.Fragment key={column.key}>
                                    {column.type === 'columnGroup' ? (
                                        // 如果是列分组，则递归渲染子列
                                        <>
                                            {column.children.map((subColumn: Column) => (
                                                <td
                                                    key={subColumn.key}
                                                    className={activeTD === subColumn.dataIndex ? table.aticve : ''}
                                                >
                                                    {subColumn.render ? subColumn.render(item[subColumn.dataIndex], item) : item[subColumn.dataIndex]}
                                                </td>
                                            ))}
                                        </>
                                    ) : (
                                        // 如果是单独的列，则渲染一个单独的表格单元格
                                        <td
                                            key={column.key}
                                            className={activeTD === column.dataIndex ? table.aticve : ''}
                                        >
                                            {column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}
                                        </td>
                                    )}
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </ConditionalRender>

            </ConditionalRender>
            <ConditionalRender mode='if' show={false}>
                <tr>
                    <td>
                        暂无数据
                    </td>

                </tr>
            </ConditionalRender>

            </tbody>
        </table>
    );
}

function Column({title, dataIndex, render}) {
    return null; // 列定义不需要在这里渲染
}

function ColumnGroup({title, children}) {
    return null; // 列定义不需要在这里渲染
}

Table.ColumnGroup = ColumnGroup;

Table.Column = Column;

export default Table;

