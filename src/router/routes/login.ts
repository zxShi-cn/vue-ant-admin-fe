import type { RouteRecordRaw } from "vue-router";
import { LOGIN_NAME } from "../constant";

// 登录路由
export const LoginRoute: RouteRecordRaw = {
    path: '/login',
    name: LOGIN_NAME,
    component: ()=>import('@/views/login/LoginView.vue'),
    meta: {
        title: '登录',
    },
};

export default [LoginRoute];