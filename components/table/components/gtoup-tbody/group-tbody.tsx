import React from 'react';
import ConditionalRender from '../../../conditional-render/conditional-render.tsx';
import Tooltip from '../../../tooltip/index.tsx';
import { Column, ColumnGroup, GroupTbodyProps } from '../../index.d';
import table from '../../index.module.less';
const GroupTbody = ({
  tableColumns,
  item,
  activeTD,
  columnWidths,
}: GroupTbodyProps) => {
  const handleStyle = (column, index) => {
    if (column.width) {
      return { maxWidth: column.width + 'px' };
    }
    if (column.showOverflowTooltip) {
      return { maxWidth: columnWidths[index] + 'px' };
    }

    
    return {};
  };

  return (
    <React.Fragment>
      {tableColumns.map((column: Column | ColumnGroup, index) => (
        <React.Fragment key={column.key}>
          {column.type === 'columnGroup' ? (
            // 如果是列分组，则递归渲染子列
            <React.Fragment>
              {column.children.map((subColumn: Column) => (
                <td
                  key={subColumn.key}
                  className={
                    activeTD === subColumn.dataIndex ? table.aticve : ''
                  }
                >
                  {subColumn.render
                    ? subColumn.render(item[subColumn.dataIndex], item)
                    : item[subColumn.dataIndex]}
                </td>
              ))}
            </React.Fragment>
          ) : (
            // 如果是单独的列，则渲染一个单独的表格单元格
            <React.Fragment>
              <td
                key={column.key}
                className={`${
                  activeTD === column.dataIndex ? table.aticve : ''
                } `}
              >
                <ConditionalRender mode="if" show={!column.showOverflowTooltip}>
                  <div
                    style={handleStyle(column, index)}
                    className={
                      column.showOverflowTooltip
                        ? table.showOverflowTooltip
                        : ''
                    }
                  >
                    {column.render
                      ? column.render(item[column.dataIndex], item)
                      : item[column.dataIndex]}
                  </div>
                </ConditionalRender>

                <ConditionalRender mode="if" show={column.showOverflowTooltip}>
                  <Tooltip title={column.render
                        ? column.render(item[column.dataIndex], item)
                        : item[column.dataIndex]}>
                    <div
                      style={handleStyle(column, index)}
                      className={
                        column.showOverflowTooltip
                          ? table.showOverflowTooltip
                          : ''
                      }
                    >
                      {column.render
                        ? column.render(item[column.dataIndex], item)
                        : item[column.dataIndex]}
                    </div>
                  </Tooltip>
                </ConditionalRender>
              </td>
            </React.Fragment>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default GroupTbody;
