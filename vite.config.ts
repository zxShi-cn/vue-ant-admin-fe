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
    const { VITE_BASE_URL, VITE_DROP_CONSOLE, VITE_MOCK_IN_PROD } = loadEnv(mode, process.cwd(), '');

    const isDev = command === 'serve';

    const isBuild = command === 'build';

    return   {
      base: VITE_BASE_URL,
      define: {
        __APP_INFO__: JSON.stringify(__APP_INFO__),
      },
      plugins: [
        vue(),
        viteMockServe({
          // default
          mockPath: './src/mockjs',
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
        port: 8081,
        open: true,
        proxy: {
          '^/api': {
            target: 'http://127.0.0.1:4523/m1/4470995-4117382-default', /* 后端服务器地址 */
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),

          }
        }
      }
    }
}
)
