import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';
// @ts-ignore
import path from 'path';
import dts from 'vite-plugin-dts'; // 引入生成声明文件插件
export default defineConfig({
    plugins: [reactRefresh(),
        dts(),

        {
            name: 'custom-output', // 自定义输出插件
            generateBundle(_, bundle) {
                const formatOutputDirs = {
                    es: 'es', // ES module 输出文件夹
                    cjs: 'cjs', // CommonJS 输出文件夹
                    umd: 'umd', // UMD 输出文件夹
                };

                // 遍历生成的文件
                for (const fileName in bundle) {
                    if (bundle[fileName].type === 'chunk') {
                        const format = fileName.split('.')[1]; // 提取格式
                        console.log('format', format)
                        const outputDir = formatOutputDirs[format];
                        console.log('outputDir', outputDir)


                        if (outputDir) {
                            // 拷贝文件到指定文件夹
                            this.emitFile({
                                type: 'asset',
                                fileName: path.join(outputDir, 'index.js'),
                                source: bundle[fileName].code,
                            });
                            delete bundle[fileName];
                        }
                    }
                }
            },
        },
    ],
    //打包压缩
    build: {
        outDir: 'ayongUI',
        lib: {
            entry: path.resolve(__dirname, './index.ts'), // 组件库入口文件
            name: 'AyongUI', // 组件库的全局名称
            formats: ['es', 'cjs', 'umd'], // 输出格式
            // entryFileNames: 'index.js', // 输出文件名，[format] 会被替换为 es、cjs、umd
            fileName: (format) => `AyongUI.${format}.js`,
        },
        rollupOptions: {
            // 外部依赖，如React、ReactDOM，以避免将它们打包到组件库中
            external: ['react', 'react-dom'],
            output: {
                //输出文件名 ayongUI

                // 全局变量名称，umd 格式必须设置
                // globals: {
                //     react: 'React',
                //     'react-dom': 'ReactDOM',
                // },
                // include: ['lodash'], // 禁用单独的 chunk 文件
            },
        },
        // optimizeDeps: {
        //     include: ['lodash'], // 配置需要合并的模块
        // },
    },

})
