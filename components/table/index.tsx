import React, {useState} from "react";
import table from './index.module.less'
import {TableProps, Column, DataItem, ColumnGroup} from "./index";
import ConditionalRender from "../conditional-render/conditional-render.tsx";
import UnfoldTd from "./components/unfold-td/unfold-td.tsx"; // 展开渲染组件
import UnfoldButton from "./components/unfold-button/unfold-button.tsx"; //展开折叠按钮组件
import Empty from "./components/empty/empty.tsx";//空数据
import GroupChildTh from "./components/group-child-th/group-child-th.tsx"; //分组 th组件
import useDragDrop from "./draggable.ts"; //分组 th组件

import {groupHandle} from "./group-handle.ts";
import GroupTbody from "./components/gtoup-tbody/group-tbody.tsx"; //分组 th组件
function Table({
                   columns,
                   children,
                   data,
                   className,
                   tbodyClassName,
                   theadClassName,
                   draggable = false,
                   onDdragAfter = () => {
                   },
                   expandable,
               }: TableProps) {

    let _tableColumns: Column[] = [];
    let colSpanSize: number = 0;
    const {expandedRowRender} = expandable || {};
    console.log('原始-_columns--', children)

    // 从props传递的columns或者通过<Table.Column>定义的列都可以使用
    const groupHandleData = groupHandle({columns, children});
    _tableColumns = groupHandleData.columns;
    colSpanSize = groupHandleData.colSpanSize;
    console.log('分组后-_tableColumns--', _tableColumns)
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

    // console.log('分组后---', tableColumns, tableData)
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

    const getClassName = (column: Column | ColumnGroup, isColumnGroup: boolean) => {
        let classNames = theadClassName;
        if (isColumnGroup) {
            classNames += ` ${table.textAlignCenter}`;
        }
        return classNames;
    };
    const getColSpan = (column: Column | ColumnGroup) => {
        return column.type === 'columnGroup' ? (column as ColumnGroup).children.length : void 1;
    };
    const getRowSpan = (column: Column | ColumnGroup) => {
        return column.type === 'columnGroup' ? void 1 : colSpanSize;
    };
    return (
        <table className={styleClassName}>
            <thead>
            <tr>

                <ConditionalRender mode='if' show={expandedRowRender}>
                    <th style={{width: ' 39px'}} rowSpan={colSpanSize} className={theadClassName}/>
                </ConditionalRender>

                {tableColumns.map((column: Column | ColumnGroup, index: number) => (
                    <React.Fragment key={column.key}>
                        <th
                            draggable={draggable}
                            colSpan={getColSpan(column)}
                            rowSpan={getRowSpan(column)}
                            className={getClassName(column, column.type === 'columnGroup')}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            {column.title}
                        </th>

                    </React.Fragment>
                ))}

            </tr>

            <GroupChildTh tableColumns={tableColumns}/>

            </thead>
            <tbody className={tbodyClassName}>
            <ConditionalRender mode='if' show={tableData.length !== 0}>
                {tableData.map((item: DataItem, index: number) => (
                    <React.Fragment key={item.key}>
                        <tr
                            draggable={draggable}
                            className={activeTR === index ? table.aticve : ''}
                            onDragStart={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragStartData(e, index)}
                            onDragOver={(e: React.DragEvent<HTMLTableRowElement>,) => handleDragOver(e)}
                            onDrop={(e: React.DragEvent<HTMLTableRowElement>,) => handleDropData(e, index)}
                        >
                            <UnfoldButton
                                index={index}
                                expandable={expandable}
                                item={item}
                                toggleExpand={toggleExpand}
                                ayonEexpandedRowKeys={ayonEexpandedRowKeys}
                            />

                            <GroupTbody tableColumns={tableColumns} item={item} activeTD={activeTD}/>

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

// JSX函数
interface ColumnFunction extends React.FC {
    displayName: string;//防止编译命名冲突
}

// @ts-ignore
const Column: ColumnFunction = ({title, dataIndex, render}) => {
    return null; // 列定义不需要在这里渲染
}

// @ts-ignore
const ColumnGroup: ColumnFunction = ({title, children}) => {
    return null; // 列定义不需要在这里渲染
}
ColumnGroup.displayName = 'ColumnGroup';
Column.displayName = 'Column';

Table.ColumnGroup = ColumnGroup;

Table.Column = Column;

export default Table;


