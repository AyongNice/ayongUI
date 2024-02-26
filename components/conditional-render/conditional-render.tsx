/**
 * @file 条件渲染 容器组件
 * 2023/11/07
 */

import React from 'react';
import './index.less'

interface ConditionalRenderPorps {
  mode?: 'show' | 'if'; // show: 利用样式 展示隐藏  类似于 vue 的 v-show，if: 利用条件判断展示隐藏 类似于 vue 的 v-if
  show: boolean;
  children: React.ReactNode;
}

function ConditionalRender({mode = 'show', show, children, renderIf, renderElse}: ConditionalRenderPorps) {

  if (mode === 'show') {
    return <div className={show ? 'show' : 'hide'}>{children}</div>;
  }
  if (mode === 'if') {
    //react模版标签 只能有一个根节点
    return show ? children : null;
  }
  if (mode === 'else') {
    return show ? renderIf() : renderElse()
  }

}

export default ConditionalRender;
