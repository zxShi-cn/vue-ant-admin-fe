import type { RouteRecordRaw } from "vue-router";


const moduleName = 'demos';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/demos',
        name: moduleName,
        component: () => import('@/layout/LayoutView.vue'),
        redirect: {name: `${moduleName}-custom-modal`},
        meta: {
            title: '样例页面',
            icon: 'DesktopOutlined',
            orderNo: 2,
        },
        children: [
            {
                path: 'form',
                name: `${moduleName}-custom-modal`,
                meta: {
                    title: '表单',
                    // keep: false, //是否缓存页面
                },
                component: () => import('@/views/demos/BasicForm.vue'),
            },
            {
                path: 'button',
                name: `${moduleName}-button`,
                meta: {
                    title: '按钮',
                    // keep: false,
                },
                component: () => import('@/views/demos/BasicButton.vue'),
            }
        ]
    }
];

export default routes;