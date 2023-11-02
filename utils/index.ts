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