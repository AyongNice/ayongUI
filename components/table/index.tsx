import React, {useState} from "react";
import table from './index.module.less'
import {TableProps, Column, DataItem, ColumnGroup, DraggableProps} from "./index.d";
import ConditionalRender from "../conditional-render/conditional-render.tsx";
import UnfoldTd from "./components/unfold-td/unfold-td.tsx"; // 展开渲染组件
import UnfoldButton from "./components/unfold-button/unfold-button.tsx"; //展开折叠按钮组件
import Empty from "./components/empty/empty.tsx";//空数据
import GroupChildTh from "./components/group-child-th/group-child-th.tsx"; //分组 th组件
import useDragDrop from "./draggable.ts"; //分组 th组件

import {groupHandle} from "./group-handle.ts";
import GroupTbody from "./components/gtoup-tbody/group-tbody.tsx";
import {UseDragDropRetunrn} from "./index"; //分组 th组件
function Table({
                 columns = [],
                 children,
                 data = [],
                 className,
                 draggable = false,
                 expandable,
                 onDragAfter = () => {
                 },
                 cellActiveClassName = () => {
                 },
               }: TableProps) {
  const styleClassName: string = `${table.table} ${className} `;
  if (!columns.length) return <table className={styleClassName}>
    <tbody>
    <Empty length={data.length}/>
    </tbody>
  </table>

  let _tableColumns: Column[] = [];
  let colSpanSize: number = 0;
  const {expandedRowRender} = expandable || {};

  // 从props传递的columns或者通过<Table.Column>定义的列都可以使用
  const groupHandleData = groupHandle({columns, children});

  _tableColumns = groupHandleData.columns;
  colSpanSize = groupHandleData.colSpanSize;

  const [ayonEexpandedRowKeys, setAyonExpandedRowKeys] = useState<Array<number | string>>([]);


  /** 每一列排序状态 **/
  const _sortOrderMap: { [key: string]: string } = {};

  /**
   * age:状态
   * 身高:状态
   *数据处理的第三步骤
   */

  /** 默认排序功能 **/
  _tableColumns.forEach((column: Column | ColumnGroup) => {
    if (column.type !== 'columnGroup') {
      const {sorter, dataIndex, defaultSortOrder} = column;
      if (sorter && typeof sorter === 'function') {
        _sortOrderMap[dataIndex] = defaultSortOrder ? defaultSortOrder === 'ascend' ? 'descend' : 'ascend' : 'default';

        if (defaultSortOrder === 'ascend') {
          data = [...data].sort(sorter)
        }
        if (defaultSortOrder === 'descend') {
          data = [...data].sort((a, b) => sorter(b, a)); // 反转排序逻辑
        }
      }
    }
  })

  const {
    tableColumns,
    tableData,
    activeTR,
    activeTD,
    setTableData,
    handleDragStart,
    handleDragStartData,
    handleDragOver,
    handleDrop,
    handleDropData,
  }: UseDragDropRetunrn = useDragDrop({_tableColumns, data, draggable, onDragAfter});

  const [sortOrderMap, stateSortOrderMap] = useState<{ [key: string]: string }>(_sortOrderMap);//排序状态

  const handleSort = (column: Column) => {
    // 提取当前列的 sorter 函数
    const {sorter, dataIndex, defaultSortOrder} = column;
    if (sorter && typeof sorter === 'function') {
      stateSortOrderMap((prevState) => {
        const map = {...sortOrderMap}
        map[dataIndex] = map[dataIndex] ? map[dataIndex] === 'ascend' ? 'descend' : 'ascend' : defaultSortOrder === 'ascend' ? 'descend' : 'ascend'
        return map
      });
      if (sortOrderMap[dataIndex] === 'ascend') {
        setTableData((prevState) => {
          return [...prevState].sort(sorter);
        });
      }
      if (sortOrderMap[dataIndex] === 'descend') {
        setTableData((prevState) => {
          return [...prevState].sort((a, b) => sorter(b, a)); // 反转排序逻辑
        });
      }

    }
  };
  const getClassName = (column: Column | ColumnGroup, isColumnGroup: boolean) => {
    return isColumnGroup ? table.textAlignCenter : '';
  };
  const getColSpan = (column: Column | ColumnGroup) => {
    return column.type === 'columnGroup' ? (column as ColumnGroup).children.length : void 1;
  };
  const getRowSpan = (column: Column | ColumnGroup) => {
    return column.type === 'columnGroup' ? void 1 : colSpanSize;
  };

  /**
   * 融合 动态设置 tr的样式 + 拖拽的 动态样式
   * @param item
   * @param index
   */
  const tableStyle = (item: DataItem, index: number): string => {
    const _className = cellActiveClassName(item, index);
    return activeTR === index ? table.aticve + _className : _className

  }
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
          <th style={{width: ' 39px'}} rowSpan={colSpanSize}/>
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
              {column.sorter && (
                <span
                  onClick={() => handleSort(column)}
                  style={{marginLeft: '5px', cursor: 'pointer'}}
                >
                                    {sortOrderMap[column.dataIndex] && sortOrderMap[column.dataIndex] === 'default' ? '↕' : sortOrderMap[column.dataIndex] === 'ascend' ? '↑' : sortOrderMap[column.dataIndex] === 'descend' ? '↓' : ''}
                                </span>
              )}

            </th>

          </React.Fragment>
        ))}

      </tr>

      <GroupChildTh tableColumns={tableColumns}/>

      </thead>
      <tbody>
      <ConditionalRender mode='if' show={tableData.length !== 0}>
        {tableData.map((item: DataItem, index: number) => (
          <React.Fragment key={item.key}>
            <tr
              draggable={draggable}
              className={tableStyle(item, index)}
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

              <GroupTbody
                item={item}
                tableColumns={tableColumns}
                activeTD={activeTD}/>

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

const Columns: ColumnFunction = ({title, dataIndex, render}) => {
  return null; // 列定义不需要在这里渲染
}

// @ts-ignore
const ColumnGroups: ColumnFunction = ({title, children}) => {
  return null; // 列定义不需要在这里渲染
}
ColumnGroups.displayName = 'ColumnGroup';
Columns.displayName = 'Column';

Table.ColumnGroup = ColumnGroups;

Table.Column = Columns;

export default Table;


