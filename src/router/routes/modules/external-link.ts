import { RouterView, type RouteRecordRaw } from "vue-router";

const Iframe = () => import('@/views/external/FrameBlank.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/external',
        name: 'external',
        component: () => import('@/layout/LayoutView.vue'),
        meta: {
            title: '外部链接',
            orderNo: 20,
            icon: 'LinkOutlined',
        },
        children: [
            {
                path: 'https://github.com/zxShi-cn/vue-ant-admin-fe',
                name: 'https://github.com/zxShi-cn/vue-ant-admin-fe',
                component: RouterView,
                meta: {
                    title: '代码仓库(外链)',
                    isExternal: true,
                    externalOpenMode: 1,
                }
            },
            {
                path: 'personal',
                name: 'Personal',
                component: Iframe,
                meta: {
                    title: '套娃(内嵌)',
                    iframeSrc: '/dashboard/welcome',
                    isExternal: true,
                    externalOpenMode: 2,
                }
            }
        ]
    }
];

export default routes;