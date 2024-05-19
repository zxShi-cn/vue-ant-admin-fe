import type { RouteRecordRaw } from "vue-router";


const moduleName = 'demos';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/demos',
        name: moduleName,
        redirect: {name: `${moduleName}-custom-modal`},
        meta: {
            titel: '样例',
            icon: 'ant-design:desktop-outlined',
        },
        children: [
            {
                path: 'custom-modal',
                name: `${moduleName}-custom-modal`,
                meta: {
                    title: '用户模型',
                    icon: 'ant-design:desktop-outlined',
                    keep: false, //是否缓存页面
                },
                component: ,
            },
            {
                path: 'button',
                name: `${moduleName}-button`,
                meta: {
                    title: '按钮',
                    icon: 'ant-design:desktop-outlined',
                    keep: false,
                },
                component: ,
            }
        ]
    }
];

export default routes;