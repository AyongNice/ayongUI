import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import styleMessage from './index.module.less';
import {NotificationProps, NotificationState, MessageProps} from './index'
import {Minusround, Upward} from "../icon/icon.ts";
import ConditionalRender from "../conditional-render/conditional-render.tsx";
import './index.module.less';
// 创建一个div添加到body中
const createNotificationPortal = () => {
    const dom = document.getElementById('notification-portal');
    if (!dom) {
        const newPortalContainer = document.createElement('div');
        newPortalContainer.id = 'notification-portal';
        //设置绝对定位样式
        newPortalContainer.style.position = 'absolute';

        document.body.appendChild(newPortalContainer);
    }
};

createNotificationPortal();


const Notification: React.FC<NotificationProps> = ({onAyongClose, message, showClose = false, type, style}) => {
    const [show, setShow] = useState<boolean>(true);
    const onMessageClose = () => {
        setShow(false);
        onAyongClose();
    }

    return (
        <ConditionalRender mode='show' show={show}>
            <div
                style={style}
                className={`${styleMessage.ayongMessage} ${styleMessage[type]} `}
                onAnimationEnd={onAyongClose}
            >
                <Upward className={styleMessage.tag}/>
                {message}
                {showClose && <Minusround onClick={onMessageClose} className='close'/>}
            </div>
        </ConditionalRender>

    );
};

const NotificationContainer: React.FC = () => {
    const [notifications] = useState<React.ReactNode[]>([]);

    return (
        <div className="notification-container">
            {notifications.map((n, index) => (
                <React.Fragment key={index}>{n?.element || n}</React.Fragment>
            ))}
        </div>
    );
};

const NotificationProvider: React.FC = ({children}) => {
    return (
        <>
            {children}
            <div id="notification-portal">
                <NotificationContainer/>
            </div>
        </>
    );
};


const notificationState: NotificationState[] = [];
const portalContainer: HTMLElement | null = document.getElementById('notification-portal');

const notify = (props: MessageProps) => {
    if (!portalContainer) {
        return;
    }
    //浏览器渲染空闲时执行
    window.requestIdleCallback(() => {
        const cloneNode: Node = portalContainer.cloneNode(true) as Node;
        portalContainer.appendChild(cloneNode);

        const onAyongClose = () => {
            portalContainer.removeChild(cloneNode);
            const index: number = notificationState.findIndex((item) => item.container === cloneNode);
            if (index !== -1) {
                notificationState.splice(index, 1); // 从状态数组中移除该通知
            }
            props.onClose && typeof props.onClose === 'function' && props.onClose()
        };

        const initialTop: number = notificationState.length * 70; // 设置初始top值，根据需求调整
        const notification = (
            <NotificationProvider key={notificationState.length}>
                <Notification onAyongClose={onAyongClose} {...props} style={{top: initialTop + 'px'}}/>
            </NotificationProvider>
        );

        const root = createRoot(cloneNode as HTMLElement);
        root.render(notification);

        notificationState.push({container: cloneNode, onAyongClose});
    });

};
// string | number | React.FC
const messageMode = {
    info: (props: { onClose: () => void; showClose: boolean; message: string }): void => {
        notify({...props as MessageProps, type: 'info'});
    },
    success: (props: MessageProps) => {
        notify({...props as MessageProps, type: 'success'});
    },
    warning: (props: MessageProps) => {
        notify({...props as MessageProps, type: 'warning'});
    },
    error: (props: MessageProps) => {
        notify({...props as MessageProps, type: 'error'});
    },
};

export default messageMode;
