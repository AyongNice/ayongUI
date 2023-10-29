import {defineConfig} from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

export default defineConfig({
    plugins: [reactRefresh()],
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
