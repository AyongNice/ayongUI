/**
 * @param onClose 关闭dom的回调方法 字段名必须是onClose, 该属性方法不需要在组件代码中传递
 * 但是在写组件使用说明时候 要体现说明onClose关闭回调方法 让开发者知晓
 *@param  element 传入的组件中 必须有onAyongClose方法
 */
export interface MountProps {
    onClose?: () => void;
    element: (options: {
        onAyongClose: () => void;
    }) => React.ReactNode;
}
