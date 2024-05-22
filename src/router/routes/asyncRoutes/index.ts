
// type ImportVueFileType = typeof import('*.vue')
// type ImportVueFileFnType = () => Promise<ImportVueFileType>;

import type { Recordable } from "vite-plugin-mock";
import type { RouteRecordRaw } from "vue-router";

// // 自动加载文件
// const modulesFiles = import.meta.glob<ImportVueFileType>('../../views/**/*.vue');

// // 动态加载的组件集
// export const asyncRoutes = Object.entries(modulesFiles).reduce((routes, [url, importFn])=>{
//     if (!/\/(views\/login|components)\//.test(url)) {
//         // 处理路径只留下vue组件名
//         const path = url.replace('../../views/', '').replace('.vue', '');
//         routes[path as any] = importFn;
//     }
//     return routes;
// }, {} as Record<string, ImportVueFileFnType>
// );

const modules = import.meta.glob(['../modules/dashboard.ts','../modules/external-link.ts','../modules/account.ts'], { eager: true});
const asyncRoutesList: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key)=>{
    const mob = (modules as Recordable)[key].default || {};
    const mobList = Array.isArray(mob) ? {...mob.at(0)} : mob.at(0);
    asyncRoutesList.push(mobList)
})

export const asyncRoutes = [...asyncRoutesList];
