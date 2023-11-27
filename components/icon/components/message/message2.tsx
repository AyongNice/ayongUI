import {MessageProps} from './index';
import ReactDOM, {createRoot, createPortal} from "react-dom/client";
import React, {createContext, ReactNode, useContext,useState} from "react";
import style from './index.module.less';

let dom: HTMLElement | null = null;
let timer: number = 0;

const getOrCreateMessagePortal = (): HTMLElement => {
    if (!dom) {
        const newPortalContainer = document.createElement('div');
        newPortalContainer.id = 'message-portal';
        document.body.appendChild(newPortalContainer);
        dom = newPortalContainer;
        getOrCreateMessagePortal();
    }
    return dom;
};

// const portalContainer = ReactDOM.createRoot(getOrCreateMessagePortal() as HTMLElement);
//
// const Message = ({title}: MessageProps = {}) => {
//
//     const dom = document.getElementById('message-portal');
//
//     document.body.appendChild(dom.cloneNode(true));
//     portalContainer.render(
//         // 在组件根元素上添加类名和动画结束回调
//         <div
//             className={style.ayongMessage}
//             onAnimationEnd={() => {
//                 portalContainer.render('');
//
//             }}
//         >
//             {title === 'function' ? title() : title}
//         </div>
//     );
//
// };
// 定义上下文
interface MessageContextProps {
    info: (content: ReactNode) => void;
    success: (content: ReactNode) => void;
    warning: (content: ReactNode) => void;
    error: (content: ReactNode) => void;
}
const MessageContext = createContext<MessageContextProps | undefined>(undefined);
const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
    const info = (content: ReactNode) => {
        console.log('Info:', content);
        // 在实际项目中，这里可以使用自己的消息组件进行显示
    };

    const success = (content: ReactNode) => {
        console.log('Success:', content);
    };

    const warning = (content: ReactNode) => {
        console.log('Warning:', content);
    };

    const error = (content: ReactNode) => {
        console.log('Error:', content);
    };

    const contextValue: MessageContextProps = {
        info,
        success,
        warning,
        error,
    };

    return (
        <MessageContext.Provider value={contextValue}>
            {children}
        </MessageContext.Provider>
    );
};
// 导出消息方法
const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};


export const message = {
    info: (content: ReactNode) => {
        const { info } = useMessage();
        info(content);
    },
    success: (content: ReactNode) => {
        const { success } = useMessage();
        success(content);
    },
    warning: (content: ReactNode) => {
        const { warning } = useMessage();
        warning(content);
    },
    error: (content: ReactNode) => {
        const { error } = useMessage();
        error(content);
    },
};


const contextHolder = <div id='ayong-message'/>;
export default [message,contextHolder];

