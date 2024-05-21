import { isNavigationFailure, NavigationFailureType, type Router } from "vue-router"
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, type whiteNameList } from "./constant"
import { useUserStore } from "@/stores/userStore";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Modal } from "ant-design-vue";
import { usePermissionStore } from "@/stores/permissionStore";

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
        const permissionStore = usePermissionStore();
        // 如果有token
        if (userStore.token) {
            // 前往登录页
            if (to.name === LOGIN_NAME) {
                next({ path: '/'});
                NProgress.done();
            } else {
                // 非登录页，校验权限
                const hasRoute = router.hasRoute(to.name!);
                // 如果路由菜单不存在
                if (permissionStore.menuList.length === 0) {
                    try {
                        // 获取用户权限
                        await userStore.afterLogin();
                    } catch (error) {
                        // 清除token，重定向到登录
                        userStore.clearLoginStatus();
                        Modal.destroyAll();
                        return next({path: '/login'});
                    }
                }
                // 要前往404页面,获取路径进行替换
                else if (to.name === PAGE_NOT_FOUND_NAME) {
                    if (permissionStore.isFirstReload) {
                        // 重新加载路由
                        userStore.reloadRoutes(router);
                        permissionStore.isFirstReload = false;
                        return next({path: to.fullPath, replace: true});
                    } else {
                        permissionStore.isFirstReload = true;
                        return next();
                    }
                }
                // 如果路径不存在，可能是动态注册的路由，需要再次重定向
                else if(!hasRoute) {
                    return next({ ...to, replace: true});
                }
                else {
                    permissionStore.isFirstReload = true;
                    return next();
                }
            }
        } else {
            // 如果没有token
            if (whiteNameList.some((name) => name === to.name)) {
                // 访问白名单页面
                next();
            } else {
                // 重新登录，并添加重定向
                next({ name: LOGIN_NAME, query: {redirect: to.fullPath}, replace: true});
            }
        }
    })

    // 路由加载后
    router.afterEach((to, from, failure) => {
        // 手动取消导航错误
        if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
            // 结束加载
            NProgress.done();
            return;
        }
        // 设置网页标题
        if (to.meta?.title) {
            document.title = to.meta.title as string;
        }
        NProgress.done();
    })

    router.onError((error) => {
        console.error('路由错误', error);
    })
}