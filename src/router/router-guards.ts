import type { Router } from "vue-router"
import { LOGIN_NAME, type whiteNameList } from "./constant"
import { useUserStore } from "@/stores/userStore";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false}) // 隐藏螺旋加载

// 路由顺序beforeRouterLeave-->beforeEach-->beforeEnter-->beforeRouteEnter-->beforeResolve-->afterEach-->beforeCreate-->created-->beforeMount-->mounted-->beforeRouteEnter的next的回调
export function createRouterGuards(router: Router, whiteNameList: whiteNameList) {
    // 全局守卫，路由加载前
    router.beforeEach(async (to, from, next) => {
        if (!from.meta?.hideProgressBar || !to.meta?.hideProgressBar) {
            // 进度条
            NProgress.start();
        }

        const userStore = useUserStore();
        // 如果有token
        if (userStore.token) {
            // 前往登录页
            if (to.name === LOGIN_NAME) {
                next({ path: '/'});
                NProgress.done();
            } else {
                // 非登录页，校验权限
                // 如果无权限
                if (userStore.permissions.length === 0) {
                    try {
                        // 获取用户权限
                        await userStore.fetchPermisionsAndMenus();
                    } catch (error) {
                        // 清除token，重定向到登录
                        userStore.clearLoginStatus();
                        
                    }
                }

            }
        }
    })
}