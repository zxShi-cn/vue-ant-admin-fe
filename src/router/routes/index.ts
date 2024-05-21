import type { RouteRecordRaw } from "vue-router";
import base from "./base";
import login from "./login";

export const rootRoute: RouteRecordRaw = {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard/welcome', // 重定向
    component: ()=>import('@/layout/LayoutView.vue'), //路由懒加载,提高效率
    meta: {
        title: '根路由',
    },
    children: [], //子路由
};

// 导出路由集
export const basicRoutes: Array<RouteRecordRaw> = [
    rootRoute,
    // 登录路由
    ...login,
    // 基础路由
    ...base,
]