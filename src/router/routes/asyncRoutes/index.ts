import type { Recordable } from "vite-plugin-mock";
import type { RouteRecordRaw } from "vue-router";

const modules = import.meta.glob('../modules/*.ts', { eager: true});
const asyncRoutesList: Array<RouteRecordRaw> = [];

Object.keys(modules).forEach((key)=>{
    const mob = (modules as Recordable)[key].default || {};
    const mobList = Array.isArray(mob) ? {...mob.at(0)} : mob.at(0);
    asyncRoutesList.push(mobList)
})

export const asyncRoutes = [...asyncRoutesList];
