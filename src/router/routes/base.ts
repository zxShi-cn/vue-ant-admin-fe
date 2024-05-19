import type { RouteRecordRaw } from "vue-router";
import { PAGE_NOT_FOUND_NAME, REDIRECT_NAME} from "@/router/constant";

// 未配置的路由显示404页面
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
    path: '/:pathMatch(.*)', // 匹配所有未配置的路由
    name: PAGE_NOT_FOUND_NAME,
    meta: {
        title: '网页不存在',
        hideInMenu: true, // 隐藏内部菜单
        // hideInTabs: true, // 隐藏标签页
    },
    component: ()=>import('@/views/error/404.vue'),
    // children:[
    //     {
    //         path: '/:pathMatch(.*)*',
    //         name: PAGE_NOT_FOUND_NAME,
    //         component: ()=> import('@/views/error/404.vue'),
    //         meta: {
    //             title: 'PageNotFound',
    //             hideMenu: true, // 隐藏菜单
    //             hideBreadcrumb: true, // 隐藏面包屑
    //         }
    //     }
    // ]
};

export default [PAGE_NOT_FOUND_ROUTE];