/**
 * @file 条件渲染 容器组件
 * 2023/11/07
 */

import React from 'react';

interface ConditionalRenderPorps {
    mode?: 'show' | 'if'; // show: 利用样式 展示隐藏  类似于 vue 的 v-show，if: 利用条件判断展示隐藏 类似于 vue 的 v-if
    show: boolean;
    children: React.ReactNode;
}

function ConditionalRender({mode = 'show', show, children}: ConditionalRenderPorps) {
    let dom: React.ReactNode = null;
    if (mode === 'show') {
        dom = (<div className={show ? 'show' : 'hide'}>{children}</div>);
    } else {
        //react模版标签 只能有一个根节点

        dom = (show ? <React.Fragment>
            {children}
        </React.Fragment> : null);
    }

    return dom;
}

export default ConditionalRender;
