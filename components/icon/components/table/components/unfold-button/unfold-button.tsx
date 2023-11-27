import ConditionalRender from "../../../conditional-render/conditional-render.tsx";
import {Column, UnfoldTdProps} from "../../index";
import table from "../../index.module.less";
import unfold from './index.module.less'
import Button from "../../../button/button.tsx";
import React from "react";

const UnfoldButton = ({
                          index,
                          expandable = {},
                          ayonEexpandedRowKeys,
                          toggleExpand = () => {
                          }
                      }: UnfoldTdProps) => {
    const {expandedRowKeys, expandIcon, onExpandChange} = expandable;

    /** 当前展开状态 **/
    const stateExpandedRowKeys: boolean = ayonEexpandedRowKeys.includes(index);

    const onClickExpand = (index: number) => {
        toggleExpand(index);
        onExpandChange(index, stateExpandedRowKeys);
    }

    return (
        <ConditionalRender mode='if' show={(Array.isArray(expandedRowKeys))}>
            <td>
                {expandable?.expandedRowKeys && expandable?.expandedRowKeys.map((rowKeys: number | string, rowKeysIndex: number) => {
                    return Number(rowKeys) === index ? (
                        // 使用传递进来的 expandIcon
                        expandIcon && typeof expandIcon === 'function' ?
                            <React.Fragment key={rowKeysIndex}>
                                {expandIcon({
                                    record: index,
                                    expanded: stateExpandedRowKeys,
                                    onExpand: toggleExpand
                                })}
                            </React.Fragment>
                            : (
                                <Button
                                    size="mini"
                                    style={{width: '20px'}}
                                    key={rowKeysIndex}
                                    onClick={() => onClickExpand(index)}
                                    className={`${table.unfold} ${unfold.rotate180} ${
                                        stateExpandedRowKeys ? unfold.rotate : ''
                                    }`}
                                >
                                    {stateExpandedRowKeys ? '-' : '+'}
                                </Button>
                            )
                    ) : null;
                })}
            </td>
        </ConditionalRender>
    )
}
export default UnfoldButton;
