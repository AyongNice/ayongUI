import ConditionalRender from "../../../conditional-render/conditional-render.tsx";
import React from "react";
import {Column, ColumnGroup} from "../../index";

/**
 * 表头分组组件 th
 * @constructor
 */
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

const GroupTh = ({tableColumns}: { tableColumns: Column[] }) => (
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
)
export default GroupTh;