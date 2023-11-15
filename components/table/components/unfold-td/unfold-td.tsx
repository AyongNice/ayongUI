import ConditionalRender from "../../../conditional-render/conditional-render.tsx";
import {Column, UnfoldTdProps} from "../../index";

const UnfoldTd = ({expandable = {}, ayonEexpandedRowKeys, index, item}: UnfoldTdProps) => {
    const {expandedRowRender, expandedRowKeys} = expandable;
    const renderExpandContent = (index: number, column: Column): string => {
        if (Array.isArray(expandedRowKeys) && expandedRowKeys.includes(index)) {
            return typeof expandedRowRender === 'function' ? expandedRowRender(column) : expandedRowRender;
        }
        return '';
    };
    console.log('UnfoldTd', ayonEexpandedRowKeys)

    return (
        <ConditionalRender mode='if' show={expandedRowRender && ayonEexpandedRowKeys.includes(index)}>
            {expandable?.expandedRowKeys && expandable?.expandedRowKeys.map((rowKeys: number | string, rowKeysIndex: number) => {
                return Number(rowKeys) === index ?
                    <tr key={rowKeysIndex} style={{width: '100%', border: 0}}>
                        <td colSpan={5}>
                            {renderExpandContent(index, item)}
                        </td>
                    </tr> : null
            })}
        </ConditionalRender>
    )
}
export default UnfoldTd;