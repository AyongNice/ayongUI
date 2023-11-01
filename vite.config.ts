import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';
// @ts-ignore
import path from 'path';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import less from 'less';
async function compileTheme(themePath) {
    const themeContent = fs.readFileSync(themePath, 'utf8');
    console.log('themePath',themePath)
    try {
        // 使用 Less 编译主题文件
        const result = await less.render(themeContent);
        const compiledCss = result.css;

        // 处理编译后的 CSS，可以将其写入文件或应用到组件库中
        // ...
    } catch (error) {
        console.error('Error compiling Less:', error);
    }
}
export default defineConfig({
    plugins: [reactRefresh(),
        {
            // 在构建前执行的任务
            name: 'theme-merge',
            configureServer(server) {
                // 获取主题文件的路径
                const defaultThemePath = 'default-theme.less';
                const customThemePath = 'custom-theme.less';

                // 检查自定义主题文件是否存在
                if (fs.existsSync(customThemePath)) {
                    // 如果自定义主题文件存在，使用它
                    compileTheme(customThemePath);
                } else {
                    // 如果自定义主题文件不存在，使用默认主题文件
                    compileTheme(defaultThemePath);
                }
            }
        }
    ],
    //打包压缩
    build: {
        lib: {
            entry: path.resolve(__dirname, './index.ts'), // 组件库入口文件
            name: 'AyongUI', // 组件库的全局名称
            formats: ['es', 'cjs', 'umd'], // 输出格式
            fileName: (format) => `AyongUI.${format}.js`,
        },
        rollupOptions: {
            // 外部依赖，如React、ReactDOM，以避免将它们打包到组件库中
            external: ['react', 'react-dom'],
            output: {
                // 全局变量名称，umd 格式必须设置
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },

})
