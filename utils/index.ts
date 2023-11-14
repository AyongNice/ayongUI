import {useRef} from "react";

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