import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
// @ts-ignore
import path from 'path';
import dts from 'vite-plugin-dts'; // 引入生成声明文件插件
export default defineConfig({
  plugins: [
    reactRefresh(),
    dts(),
    // {
    //   name: 'style',
    //   generateBundle(config, bundle) {
    //     //这里可以获取打包后的文件目录以及代码code
    //     const keys = Object.keys(bundle);

    //     for (const key of keys) {
    //       const bundler: any = bundle[key as any];
    //       //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件

    //       this.emitFile({
    //         type: 'asset',
    //         fileName: key, //文件名名不变
    //         source: bundler.code.replace(/\.less/g, '.css'),
    //       });
    //     }
    //   },
    // },
  ],
  //打包压缩
  build: {
    //打包文件目录
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, './index.ts'), // 组件库入口文件
      name: 'ayongui', // 组件库的全局名称
    },
    rollupOptions: {
      // 外部依赖，如React、ReactDOM，以避免将它们打包到组件库中
      external: ['react', 'react-dom' ],

      input: ['index.ts'],
      output: [
        {
          //打包格式
          format: 'es',
          //打包后文件名
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: 'named',
          //配置打包根目录
          dir: './dist/es',
        },
        // {
        //   //打包格式
        //   format: 'cjs',
        //   //打包后文件名
        //   entryFileNames: '[name].js',
        //   //让打包目录和我们目录对应
        //   preserveModules: true,
        //   exports: 'named',
        //   //配置打包根目录
        //   dir: './dist/lib',
        // },
      ],
    },
  },
});
