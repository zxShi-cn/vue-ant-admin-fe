import { title } from "process";
import type { RouteRecordRaw } from "vue-router";

const moduleName = 'account';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/account',
        redirect: '/account/settings',
        meta: {
            title: '个人中心',
            hideInMenu: true, // 不显示在菜单中
        },
        children: [
            {
                path: 'settings',
                name: 'account-settings',
                component: ,
                meta: {
                    title: '个人设置',
                    hideInMenu: true,
                }
            }
        ]
    },
];

export default routes;