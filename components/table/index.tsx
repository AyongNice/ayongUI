import React, {useState} from "react";
import table from './index.module.less'
import {TableProps, Column, DataItem, ColumnGroup} from "./index";
import ConditionalRender from "../conditional-render/conditional-render.tsx";
import UnfoldTd from "./components/unfold-td/unfold-td.tsx"; // 展开渲染组件
import UnfoldButton from "./components/unfold-button/unfold-button.tsx"; //展开折叠按钮组件
import Empty from "./components/empty/empty.tsx";//空数据
import GroupTh from "./components/group-th/group-th.tsx"; //分组 th组件
import useDragDrop from "./draggable.ts"; //分组 th组件

import {groupHandle} from "./group-handle.ts"; //分组 th组件
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
               }: TableProps) {

    let _tableColumns: Column[] = [];
    let colSpanSize: number = 0;
    const {expandedRowRender} = expandable || {};

    // 从props传递的columns或者通过<Table.Column>定义的列都可以使用
    const groupHandleData = groupHandle({columns, children});
    _tableColumns = groupHandleData.columns;
    colSpanSize = groupHandleData.colSpanSize;

    const [ayonEexpandedRowKeys, setAyonExpandedRowKeys] = useState<Array<number | string>>([]);
    const styleClassName: string = `${table.table} ${className} `;

    const {
        tableColumns,
        tableData,
        activeTR,
        activeTD,
        handleDragStart,
        handleDragStartData,
        handleDragOver,
        handleDrop,
        handleDropData,
    } = useDragDrop({_tableColumns, data, draggable, onDdragAfter});


    const toggleExpand = (rowIndex: number): void => {
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


            <GroupTh tableColumns={tableColumns}/>

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
                            <UnfoldButton
                                index={index}
                                expandable={expandable}
                                toggleExpand={toggleExpand}
                                ayonEexpandedRowKeys={ayonEexpandedRowKeys}
                            />
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
                        <UnfoldTd
                            item={item}
                            index={index}
                            expandable={expandable}
                            ayonEexpandedRowKeys={ayonEexpandedRowKeys}
                        />
                    </React.Fragment>
                ))}

            </ConditionalRender>

            <Empty length={data.length}/>

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


