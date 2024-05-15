import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'
import { whiteNameList } from './constant';

// 创建路由
const router = createRouter({
  history: createWebHashHistory(), //使用哈希模式
  routes: basicRoutes, //路由集
})

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const {name} = route;
    // 排除白名单路由
    if (name && !whiteNameList.some((n) => n === name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  })
}

export default router
