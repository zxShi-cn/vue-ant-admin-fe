import { LAYOUT_VIEW } from "@/router/constant";
import type { RouteRecordRaw } from "vue-router";

const moduleName = 'account';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/account',
        redirect: '/account/settings',
        component: LAYOUT_VIEW,
        meta: {
            title: '个人中心',
            orderNo: 20,
            icon: 'UserOutlined',
            // hideInMenu: false, // 不显示在菜单中
        },
        children: [
            {
                path: 'settings',
                name: 'account-settings',
                component: () => import('@/views/account/AccountSettings.vue'),
                meta: {
                    title: '个人设置',
                    hideInMenu: false,
                }
            },
            {
                path: 'about',
                name: 'account-about',
                component: () => import('@/views/account/AccountAbout.vue'),
                meta: {
                    title: '关于',
                }
            }
        ]
    },
];

export default routes;