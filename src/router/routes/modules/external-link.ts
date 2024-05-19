import { RouterView, type RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: 'https://github.com/zxShi-cn/vue-ant-admin-fe',
        name: 'https://github.com/zxShi-cn/vue-ant-admin-fe',
        component: RouterView,
        meta: {
            title: '代码仓库',
            icon: 'ant-design:link-outlined',
            isExternal: true,
            externalOpenMode: 1,
        }
    }
];

export default routes;