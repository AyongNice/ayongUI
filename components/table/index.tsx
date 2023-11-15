import React, {useState} from "react";
import table from './index.module.less'
import {TableProps, Column, DataItem, ColumnGroup} from "./index";
import ConditionalRender from "../conditional-render/conditional-render.tsx";
import {Button} from "../../index.ts";
import {log} from "../../utils/index.ts";

// console.log(table)
function renderSubHeaders(columns: Column[]) {
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
                   columns,
                   children,
                   data,
                   className,
                   tbodyClassName,
                   theadClassNmae,
                   draggable = false,
                   onDdragAfter = () => {
                   },
                   expandable,
                   test
               }: TableProps) {

    let _tableColumns: Column[] = [];
    let colSpanSize: number = 0;
    const {expandedRowRender, expandedRowKeys, onExpand} = expandable || {};
    console.log(1, expandedRowKeys)
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
                            colSpanSize = child.props.children.length;
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
    const [ayonEexpandedRowKeys, setAyonExpandedRowKeys] = useState<Array<number | string>>([]);
    const toggleExpand = (rowIndex: number) => {
        const newExpandedRowKeys = [...ayonEexpandedRowKeys];
        if (newExpandedRowKeys.includes(rowIndex)) {
            // 如果已展开，则折叠
            const index = newExpandedRowKeys.indexOf(rowIndex);
            newExpandedRowKeys.splice(index, 1);
        } else {
            // 如果未展开，则展开
            newExpandedRowKeys.push(rowIndex);
        }
        setAyonExpandedRowKeys(newExpandedRowKeys);
    };

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

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>): void => {
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

                <ConditionalRender mode='if' show={expandedRowRender}>
                    <th style={{width: ' 39px'}} rowSpan={colSpanSize} className={theadClassNmae}/>
                </ConditionalRender>

                {tableColumns.map((column: Column | ColumnGroup, index: number) => (
                    <React.Fragment key={column.key}>
                        {column.type === 'columnGroup' ?
                            // 如果是列分组，则递归渲染子级表头

                            <th
                                draggable={draggable}
                                colSpan={(column as ColumnGroup).children.length}
                                className={`${table.textAlignCenter}${theadClassNmae}`}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                {column.title}
                            </th>

                            : <th
                                draggable={draggable}
                                rowSpan={colSpanSize}
                                className={`${theadClassNmae}`}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                {column.title}
                            </th>
                        }

                    </React.Fragment>
                ))}

            </tr>


            <tr>
                {tableColumns.map((column: Column | ColumnGroup) => (
                    <React.Fragment key={column.key}>
                        {column.type === 'columnGroup' && (
                            // 如果是列分组，则递归渲染子级表头
                            renderSubHeaders((column as ColumnGroup).children, (column as ColumnGroup).children.length)
                        )}
                    </React.Fragment>
                ))}
            </tr>

            </thead>
            <tbody className={tbodyClassName}>
            <ConditionalRender mode='if' show={tableData.length !== 0}>
                {tableData.map((item: DataItem, index: number) => (
                    <React.Fragment key={item.key}>
                        <tr
                            draggable={draggable}
                            className={activeTR === index ? table.aticve : ''}
                            onDragStart={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragStartData(e, index)}
                            onDragOver={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragOver(e, index)}
                            onDrop={(e: React.DragEvent<HTMLTableRowElement>,) => handleDropData(e, index)}
                        >
                            <ConditionalRender mode='if'
                                               show={(Array.isArray(expandedRowKeys))}>
                                <td>
                                    {expandable?.expandedRowKeys.map((rowKeys: number | string, rowKeysIndex: number) => {
                                        return Number(rowKeys) === index ? <Button
                                            size='mini'
                                            style={{width: ' 20px'}}
                                            key={rowKeysIndex}
                                            onClick={() => toggleExpand(index)}
                                            className={table.unfold}>{Array.isArray(expandedRowKeys) ? ayonEexpandedRowKeys.includes(index) ? '-' : '+' : ''}</Button> : null
                                    })}
                                </td>
                            </ConditionalRender>

                            {tableColumns.map((column: Column | ColumnGroup) => (
                                <React.Fragment key={column.key}>
                                    {column.type === 'columnGroup' ? (
                                        // 如果是列分组，则递归渲染子列
                                        <React.Fragment>
                                            {column.children.map((subColumn: Column) => (
                                                <td
                                                    key={subColumn.key}
                                                    className={activeTD === subColumn.dataIndex ? table.aticve : ''}
                                                >
                                                    <React.Fragment>
                                                        {subColumn.render ? subColumn.render(item[subColumn.dataIndex], item) : item[subColumn.dataIndex]}
                                                        {Array.isArray(expandedRowKeys) ? ayonEexpandedRowKeys.includes(index) ? typeof expandedRowRender === 'function' ? expandedRowRender(column) : expandedRowRender : '' : ''}
                                                    </React.Fragment>
                                                </td>
                                            ))}
                                        </React.Fragment>
                                    ) : (
                                        // 如果是单独的列，则渲染一个单独的表格单元格
                                        <React.Fragment>
                                            <td
                                                key={column.key}
                                                className={activeTD === column.dataIndex ? `${table.aticve}` : ''}
                                            >
                                                {column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}

                                            </td>
                                        </React.Fragment>

                                    )}
                                </React.Fragment>
                            ))}
                        </tr>

                        <ConditionalRender mode='if' show={ayonEexpandedRowKeys.includes(index)}>
                            {expandable?.expandedRowKeys.map((rowKeys: number | string, rowKeysIndex: number) => {
                                return Number(rowKeys) === index ?
                                    <tr key={rowKeysIndex} style={{width: '100%', border: 0}}>
                                        <td colSpan={5}>
                                            {ayonEexpandedRowKeys.includes(index) ? typeof expandedRowRender === 'function' ? expandedRowRender(item) : expandedRowRender : ''}
                                        </td>
                                    </tr> : null
                            })}
                        </ConditionalRender>

                    </React.Fragment>
                ))}

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


