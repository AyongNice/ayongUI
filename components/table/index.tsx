import React, {useEffect, useState} from "react";
import table from './index.module.less'
import {TableProps, Column, DataItem, ColumnGroup, CheckboxDataItem} from "./index.d";
import ConditionalRender from "../conditional-render/conditional-render.tsx";
import UnfoldTd from "./components/unfold-td/unfold-td.tsx"; // 展开渲染组件
import UnfoldButton from "./components/unfold-button/unfold-button.tsx"; //展开折叠按钮组件
import Empty from "./components/empty/empty.tsx";//空数据
import GroupChildTh from "./components/group-child-th/group-child-th.tsx"; //分组 th组件
import useDragDrop from "./draggable.ts"; //分组 th组件

import {groupHandle} from "./group-handle.ts";
import GroupTbody from "./components/gtoup-tbody/group-tbody.tsx";
import {UseDragDropRetunrn} from "./index"; //分组 th组件
import Checkbox from '../checkbox/index.tsx';
import Radio from '../radio/index.tsx';

function Table({
                 columns = [],
                 children,
                 data = [],
                 className,
                 draggable = false,
                 expandable,
                 rowSelection,
                 onDragAfter = () => {
                 },
                 cellActiveClassName = () => {
                 },
               }: TableProps) {

  const styleClassName: string = `${table.table} ${className} `;
// 用于存储处理后的columns
  let _tableColumns: Column[] = [];
  // 用于计算colSpanSize 分组表头的列数
  let colSpanSize: number = 0;
  // 展开自定义渲染
  const {expandedRowRender} = expandable || {};


  /**
   * 数据处理的第一步骤 数据处理
   * 从props传递的columns或者通过<Table.Column>定义的列都可以使用 将其转换为统一的columns
   */
  const groupHandleData = groupHandle({columns, children});

  if (!groupHandleData.columns.length) return <table className={styleClassName}>
    <tbody>
    <Empty length={data.length}/>
    </tbody>
  </table>

  _tableColumns = groupHandleData.columns;
  colSpanSize = groupHandleData.colSpanSize;


  /** 展开折叠记录状态 **/
  const [ayonEexpandedRowKeys, setAyonExpandedRowKeys] = useState<Array<number | string>>([]);

  /** 多选记录状态 **/
  const [selectRowkeys, setSelectRowkeys] = useState<number[] | number | null>([]);

  /**
   *数据处理的第二步骤
   */

  /** 每一列排序状态 **/
  const _sortOrderMap: { [key: string]: string } = {};


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

  /**
   * 数据处理的第三步骤
   * @param tableColumns  {Column[]}最终渲染的列
   * @param tableData {DataItem[]} 最终渲染的数据
   * @param activeTR {number}  拖拽的行
   * @param activeTD {number} 拖拽的列
   * @param setTableData {Function}  设置渲染的数据hook方法
   * @param handleDragStart {Function} 拖拽列开始
   * @param handleDragStartData {Function} 拖拽行开始
   * @param handleDragOver {Function} 拖拽中
   * @param handleDrop {Function} 拖拽列结束
   * @param handleDropData {Function} 拖拽行结束
   */
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

//排序状态
  const [sortOrderMap, stateSortOrderMap] = useState<{ [key: string]: string }>(_sortOrderMap);

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

  /**
   *   展开折叠
   * @param rowIndex
   */
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

  //选择框监听
  useEffect(() => {
    if (typeof rowSelection?.onChange === "function") {
      rowSelection.onChange(selectRowkeys.map(_ => (tableData[_])))
    }
  }, [selectRowkeys])

  useEffect(() => {
    setSelectRowkeys([])
  }, [rowSelection])
  //选择框出发
  const onChange = (index: number) => {
    // 房间号
    setSelectRowkeys((prevState) => {
      if (rowSelection.type === 'radio') {
        return [index]
      } else {
        if (prevState.includes(index)) {
          return prevState.filter(_ => _ !== index)
        } else {
          return [...prevState, index]
        }
      }


    })

  }

  const onAllChange = (check) => {
    const newArr: number[] = [];
    if (check) {
      tableData.map((_, index) => {
        const checkbox: CheckboxDataItem | null = rowSelection?.getCheckboxProps(_) || null;
        if (!checkbox?.disabled) {
          return newArr.push(index)
        }
      })
    }

    setSelectRowkeys(newArr)
  }
  return (
    <table className={styleClassName}>
      <thead>
      <tr>
        <ConditionalRender mode='if' show={expandedRowRender}>
          <th style={{width: ' 39px'}} rowSpan={colSpanSize}/>
        </ConditionalRender>

        <ConditionalRender mode='if' show={rowSelection}>
          <ConditionalRender
            mode='else'
            show={rowSelection?.type === 'radio'}
            renderIf={() => <th style={{width: ' 39px'}} rowSpan={colSpanSize}/>}
            renderElse={() => <th style={{width: ' 39px'}} rowSpan={colSpanSize}>
              <Checkbox onChange={onAllChange}
                        indeterminate={selectRowkeys.length && tableData.length > selectRowkeys.length}
                        checked={tableData.length == selectRowkeys.length}/>
            </th>}
          >
          </ConditionalRender>
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
              onDragStart={(e: React.DragEvent<HTMLTableRowElement>) => handleDragStartData(e, index)}
              onDragOver={(e: React.DragEvent<HTMLTableRowElement>) => handleDragOver(e)}
              onDrop={(e: React.DragEvent<HTMLTableRowElement>) => handleDropData(e, index)}
            >
              <ConditionalRender mode='if' show={rowSelection}>
                <ConditionalRender
                  mode='else'
                  show={rowSelection?.type === 'radio'}
                  renderIf={() => <td style={{width: ' 39px'}}>
                    <Radio onChange={() => onChange(index)}
                           {...rowSelection.getCheckboxProps(item)}
                           checked={selectRowkeys.includes(index)}
                    />
                  </td>}
                  renderElse={() => <td style={{width: ' 39px'}}>
                    <Checkbox onChange={() => onChange(index)}
                              {...rowSelection.getCheckboxProps(item)}
                              checked={selectRowkeys ? selectRowkeys.includes(index) : false}
                    />
                  </td>}
                >
                </ConditionalRender>
              </ConditionalRender>

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
  )
    ;
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


