import React from "react";
import table from "../../index.module.less";
import {Column, ColumnGroup, GroupTbodyProps} from "../../index";


const GroupTbody = ({tableColumns, item, activeTD}: GroupTbodyProps) => (
    <React.Fragment>
        {
            tableColumns.map((column: Column | ColumnGroup) => (
                <React.Fragment key={column.key}>
                    {column.type === 'columnGroup' ? (
                        // 如果是列分组，则递归渲染子列
                        <React.Fragment>
                            {column.children.map((subColumn: Column) => (
                                <td
                                    key={subColumn.key}
                                    className={activeTD === subColumn.dataIndex ? table.aticve : ''}
                                >
                                    {subColumn.render ? subColumn.render(item[subColumn.dataIndex], item) : item[subColumn.dataIndex]}
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
            ))
        }
    </React.Fragment>

)

export default GroupTbody;