import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createPersistedState } from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia();

pinia.use(
    createPersistedState({
    // 全局配置key
      key: id => `__persisted__${id}`,
      auto: false,
    })
  )

// 使用ant组件库
app.use(Antd)

// 使用pinia进行状态管理
app.use(pinia)

// 使用router进行路由管理
app.use(router)

app.mount('#app')
