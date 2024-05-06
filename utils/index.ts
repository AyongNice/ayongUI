import {useRef} from "react";

// import type {ThemeConfig} from './index.d.ts'


/**
 * @description: 防抖函数
 * @param fn
 * @param delay
 */
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
export const isPromise = async (Fun: () => Promise<boolean> | boolean, ...args: any[]) => {
  //return 函数结果 并且判断是否是promise
  //判断 是否Promise类型
  return new Promise(async (resolve, reject) => {
    try {
      const res = await Fun(...args)
      resolve(res)
    } catch (e) {
      reject(e)
    }

  })

}
export const formatFileSize = (sizeInBytes: number) => {
  // 将字节数转换为兆字节，并精确到小数点后两位
  const sizeInMegabytes = sizeInBytes / 1024;
  return sizeInMegabytes.toFixed(1);
};
export const readAsDataURLImg = (file: File, maxWidth: number, maxHeight: number): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {


        let width = img.width;
        let height = img.height;

        // 如果图片尺寸超过最大限制，进行缩放
        if (width > maxWidth || height > maxHeight) {
          const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
          width *= scaleFactor;
          height *= scaleFactor;
        }

        // 使用 canvas 进行重新绘制，设置新尺寸
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // 将 canvas 转为 base64 编码
        const resizedImageDataUrl = canvas.toDataURL('image/jpeg');

        // 更新状态，显示调整大小后的图片
        resolve(resizedImageDataUrl);
      };
    };

    reader.readAsDataURL(file);
  });

};

//判断字符是否符合 链接格式
export const isURL = (str: string): boolean => /^(ftp|http|https):\/\/[^ "]+$/.test(str);
export const isObject = (data) => {
  return Object.prototype.toString.call(data) === '[object Object]';
}

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
  for (let [variable, value] of Object.entries(themeConfig)) {
    root.style.setProperty(`--${variable}`, value);
  }
}


export  const  generateUUID=() =>{
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
