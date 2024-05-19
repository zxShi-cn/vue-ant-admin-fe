import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { setupRouter } from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPersistedState } from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia();

async function setupApp() {
  pinia.use(
    createPersistedState({
    // 全局配置key
      key: id => `__persisted__${id}`,
      auto: true,
    })
  )

  // 使用ant组件库
  app.use(Antd)

  // 使用pinia进行状态管理
  app.use(pinia)

  // 挂载路由
  await setupRouter(app);

  app.mount('#app')
}

setupApp();
