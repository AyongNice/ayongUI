import React from "react";
import {Column, ColumnGroup} from "./index.d";

interface GroupHandleProps {
  columns?: Column[];
  children?: React.FC[];
}

interface Group {
  columns?: Column[];
  colSpanSize?: number;
}

// @ts-ignore
export function groupHandle({columns, children}: GroupHandleProps): Group {
  let colSpanSize: number = 0;
  if (columns.length) {
    return {columns, colSpanSize};
  } else if (children) {
    return {
      columns: React.Children.map(children, (child) => {
        if (child.type.displayName === 'Column') {
          return {
            title: child.props.title,
            dataIndex: child.props.dataIndex,
            render: child.props.render,
            key: child.key,
          };
        }
        if (child.type.displayName === 'ColumnGroup') {
          // 递归处理 ColumnGroup 中的列信息
          return {
            title: child.props.title,
            type: 'columnGroup',
            children: React.Children.map(child.props.children, (columnChild) => {
              if (columnChild.type.displayName === 'Column') {
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
      }),
      colSpanSize
    }
  }
}
