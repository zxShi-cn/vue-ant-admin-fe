import { fileURLToPath, URL } from 'node:url'

import { viteMockServe } from "vite-plugin-mock";

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'
import dayjs from 'dayjs'

const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

// https://vitejs.dev/config/
export default defineConfig (({command, mode}) =>{
    const { VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PORT, VITE_TARGET_URL } = loadEnv(mode, process.cwd(), '');

    const isDev = command === 'serve';

    const isBuild = command === 'build';

    return   {
      base: VITE_PUBLIC_PATH,
      define: {
        __APP_INFO__: JSON.stringify(__APP_INFO__),
      },
      plugins: [
        vue(),
        viteMockServe({
          // default
          mockPath: './src/mockjs',
          // 是否开启mock
          enable: false,
          logger: true,
        }),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      server: {
        host: '127.0.0.1',
        port: VITE_PORT as unknown as number,
        // 项目启动，自动打开页面
        open: true,
        proxy: {
          '^/api': {
            target: VITE_TARGET_URL, /* 后端服务器地址 */
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          }
        }
      },
      build: {
        minify: "terser", // 必须开启：使用terserOptions才有效果
        terserOptions: {
          compress: {
            //生产环境时移除console
            drop_console: VITE_DROP_CONSOLE as any as boolean,
            drop_debugger: true,
          },
        },
        // 分解块
        rollupOptions: {
          output:{
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            }
          }
        },
      },
    }
}
)
