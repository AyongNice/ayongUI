import ConditionalRender from "../../../conditional-render/conditional-render.tsx";

/**
 * 空数据组件
 * @param length
 * @constructor
 */
const Empty = ({length = 1}: { length: number }) => (
    <ConditionalRender mode='if' show={length === 0}>
        <tr>
            <td>
                暂无数据
            </td>

        </tr>
    </ConditionalRender>
)
export default Empty;