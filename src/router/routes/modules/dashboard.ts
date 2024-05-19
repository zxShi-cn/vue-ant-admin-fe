import type { RouteRecordRaw } from "vue-router";

const moduleName = 'dashboard';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        name: moduleName,
        redirect: '/dashboard/welcome',
        meta: {
            title: 'dashboard',
            icon: 'ant-design:dashboard-outlined',
        },
        children: [
            {
                path: 'welcome',
                name: `${moduleName}-welcome`,
                meta: {
                    title: '仪表盘',
                    icon: 'ant-design:home-filled',
                },
                component: ()=>import("@/views/dashboard/DashboardView.vue"),
            }
        ]
    }
];

export default routes;