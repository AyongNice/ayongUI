import {useRef} from "react";

// import type {ThemeConfig} from './index.d.ts'

export function useDebounce(fn: Function, delay: number) {
  const refTimer = useRef<number>();

  return function f(...args: any) {
    if (refTimer.current) {
      clearTimeout(refTimer.current);
    }
    refTimer.current = setTimeout(() => {
      fn(args);
    }, delay);
  }
}

/**
 * @description: 日志打印工具
 * @param test {boolean} 是否打印
 * @param arg {any[]} 参数
 */
export const log = (test: boolean, ...arg: any[]) => {
  if (!test) return;
  console.log(arg)
}
// @ts-ignore
export const isPromise = async (Fun: (() => boolean) | (() => Promise<boolean>) = () => false, arg) => {
  //return 函数结果 并且判断是否是promise
  //判断 是否Promise类型
  return new Promise(async (resolve, reject) => {
    let res = await Fun(arg)
    resolve(res)
  })

}

//判断字符是否符合 链接格式
export const isURL = (str: string): boolean => /^(ftp|http|https):\/\/[^ "]+$/.test(str);

interface ThemeConfig {
  'ayong-primary-color': string;                   // 全局主题色
  'ayong-safe': string;                            // 安全颜色
  'ayong-dangerous': string;                       // 危险颜色
  'ayong-warn': string;                            // 警告颜色
  'ayong-font-color': string;                      // 字体颜色
  'ayong-font-size': string;                       // 字体大小
  'ayong-default-size': string;                    // 默认大小
  'ayong-small-size': string;                      // 小号大小
  'ayong-large-size': string;                      // 大号大小
  'ayong-border-radius': string;                   // 边框半径
  'ayong-icon-size': string;                       // 图标大小
  'ayong-table-font-color': string;               // 表格字体颜色
  'ayong-table-font-size': string;                // 表格字体大小
  'ayong-premium-grey': string;                   // 高级灰色
  'ayong-mini-size': string;                       // 迷你尺寸
  'ayong-table-thead-color': string;              // 表头颜色
}

export function setThemeVariables(themeConfig: ThemeConfig): void {
  const root: HTMLElement = document.documentElement;
  console.log(111)
  for (let [variable, value] of Object.entries(themeConfig)) {
    root.style.setProperty(`--${variable}`, value);
  }
}
