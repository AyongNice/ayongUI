import ConditionalRender from "../../../conditional-render/conditional-render.tsx";
import {Column, UnfoldTdProps} from "../../index";
import table from "../../index.module.less";
import Button from "../../../button/index.tsx";
import React from "react";

const UnfoldButton = ({
                          expandable = {}, ayonEexpandedRowKeys, index, toggleExpand = () => {
    }
                      }: UnfoldTdProps) => {
    const {expandedRowKeys} = expandable;
    console.log('UnfoldButton', ayonEexpandedRowKeys)
    return (
        <ConditionalRender mode='if' show={(Array.isArray(expandedRowKeys))}>
            <td>
                {expandable?.expandedRowKeys && expandable?.expandedRowKeys.map((rowKeys: number | string, rowKeysIndex: number) => {
                    return Number(rowKeys) === index ? <Button
                        size='mini'
                        style={{width: ' 20px'}}
                        key={rowKeysIndex}
                        onClick={() => toggleExpand(index)}
                        className={table.unfold}>{Array.isArray(expandedRowKeys) ? ayonEexpandedRowKeys.includes(index) ? '-' : '+' : ''}</Button> : null
                })}
            </td>
        </ConditionalRender>
    )
}
export default UnfoldButton;