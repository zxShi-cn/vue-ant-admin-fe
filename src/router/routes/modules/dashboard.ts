import { LAYOUT_VIEW } from "@/router/constant";
import type { RouteRecordRaw } from "vue-router";

const moduleName = 'dashboard';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        name: moduleName,
        redirect: '/dashboard/welcome',
        meta: {
            title: '仪表盘',
            icon: 'DashboardOutlined',
            orderNo: 1,
        },
        component: LAYOUT_VIEW,
        children: [
            {
                path: 'welcome',
                name: `${moduleName}-welcome`,
                meta: {
                    title: '工作台',
                },
                component: ()=>import("@/views/dashboard/DashboardView.vue"),
            }
        ]
    }
];

export default routes;