import { createRouter, createWebHashHistory} from 'vue-router'
import { basicRoutes } from './routes'
import { whiteNameList } from './constant';
import type { App } from 'vue';
import { createRouterGuards } from './router-guards';
import { asyncRoutes } from './routes/asyncRoutes';

// 创建路由
const router = createRouter({
  history: createWebHashHistory(), //使用哈希模式
  routes: basicRoutes, //路由集
})

// 重置路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const {name} = route;
    // 排除白名单路由,重置动态加载的路由
    if (name && !whiteNameList.some((n) => n === name) && asyncRoutes.some((n)=> n.name === name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  })
}

// 挂载路由
export async function setupRouter(app: App) {
  // 创建路由守卫
  createRouterGuards(router, whiteNameList)
  app.use(router);

  // 等待路由准备
  await router.isReady();
}

export default router
