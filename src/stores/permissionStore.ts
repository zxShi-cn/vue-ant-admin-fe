import { defineStore } from "pinia";
import { ref, toRaw } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { useUserStore } from "./userStore";
import { asyncRoutes } from "@/router/routes/asyncRoutes";


export const usePermissionStore = defineStore(
    'permission',
    () => {
        // 定义数据
        // const isDynamicAddRoute = ref<boolean>(false);
        // const permisisonList = ref<string[]>([]);
        const menuList = ref<RouteRecordRaw[]>([]);
        const externalLink = ref<RouteRecordRaw[]>([]);

        // 定义方法

        // 处理菜单
        const sortMenus = (menus: RouteRecordRaw[] = []) => {
            return menus
                .filter((n) => {
                // 过滤不生成菜单的路由
                const flag = !n.meta?.hideInMenu;
                if (flag && n.children?.length) {
                    n.children = sortMenus(n.children);
                }
                return flag;
                })
                .sort((a, b) => ~~Number(a.meta?.orderNo) - ~~Number(b.meta?.orderNo));
            };
            // 生成路由菜单
        const buildRoutes = async (): Promise<RouteRecordRaw[]> => {
            const userStore = useUserStore();
            const roleList = toRaw(userStore.permissions) || [];

            const filterRoutes = (routes: RouteRecordRaw[], roles: string[] | string) => {
                return routes.filter((route)=>{
                    // 过滤外链
                    if (route.meta?.isExternal) {
                        externalLink.value.push(route);
                        return false;
                    }
                    if (!route.meta?.role)
                        return true;
                    if (Array.isArray(roles))
                        return roles.some((role)=> role === route.meta?.role);
                    else
                        return roles === route.meta?.role;
                })
            }
            // 过滤无权的路由
            const routes = filterRoutes(asyncRoutes, roleList);
            // 生成菜单
            menuList.value = sortMenus(routes);
            userStore.menus = menuList.value;
            return routes;
        }

        return {
            buildRoutes,
            menuList,
            externalLink,
        };
    },
);