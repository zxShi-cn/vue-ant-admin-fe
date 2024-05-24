import router from "@/router";
import { LOGIN_NAME, PAGE_NOT_FOUND_NAME, REDIRECT_NAME } from "@/router/constant";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useRoute, type RouteLocationMatched, type RouteLocationNormalizedLoaded } from "vue-router";

// 不需要出现在tabs中的路由
export const routeExcludes = [REDIRECT_NAME, LOGIN_NAME, PAGE_NOT_FOUND_NAME, "dashboard-welcome"] as const;

export const useTabsStore: any = defineStore(
    'tabs-view',
    () => {
        const currentRoute = useRoute();
        // 标签页列表
        const tabsList = ref<RouteLocationNormalizedLoaded[]>([]);

        // 获取tabs列表
        const getTabsList = computed(() => {
            return tabsList.value.filter((item) => {
                return item && !isInRouteExcludes(item) && router.hasRoute(item.name!);
            })
        })

        // 获取当前tab
        const getCurrentTab = computed(() => {
            return tabsList.value.find((item) => {
                return item && !isInRouteExcludes(item) && item.fullPath === currentRoute.fullPath;
            })
        })

        // 判断是否排除路由
        const isInRouteExcludes = (route: RouteLocationNormalizedLoaded) => {
            return route.meta?.hideInTabs || routeExcludes.some((n) => n === route.name);
        }

        const getRawRoute = (route: RouteLocationNormalizedLoaded): RouteLocationNormalizedLoaded => {
            return {
              ...route,
              matched: route.matched.map((item) => {
                const { meta, path, name } = item;
                return { meta, path, name };
              }) as RouteLocationMatched[],
            };
          };

        // 添加标签页
        const addTabs = (route: RouteLocationNormalizedLoaded) => {
            if (isInRouteExcludes(route)) {
                return false;
            }
            // 标签页已存在
            const isExist = tabsList.value.some((item) => item.fullPath === route.fullPath);
            if (!isExist) {
                tabsList.value.push(getRawRoute(route));
            }
            return true;
        }

        // 关闭标签页
        const closeCurrentTab = (route: RouteLocationNormalizedLoaded) => {
            const item= tabsList.value.find((item) => item.fullPath === route.fullPath);
            const isDelCurrentTab = Object.is(getCurrentTab.value, item);
            // 删除对应页面信息
            tabsList.value = tabsList.value.filter((i) => {
                return item?.fullPath !== i.fullPath;
            });
            // 关闭当前页面，重定向页面
            if (isDelCurrentTab) {
                if (tabsList.value.length === 0) {
                    router.push("/");
                }
                else {
                    const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
                    router.push(currentRoute);
                }
            }
        }

        // 更新tab标题
        const updateTabTitle = (title: string) => {
            const target = tabsList.value.find((item) => item.fullPath === currentRoute.fullPath);
            if (target) {
                target.meta.title = title;
            }
        }

        // 自动添加标签页
        watch(
            () => currentRoute.fullPath,
            () => {
                addTabs(currentRoute);
            },
            { immediate: true },
        )

        // 页面关闭或刷新时，重置标签列表
        window.addEventListener('beforeunload', () => {
            if (isInRouteExcludes(currentRoute)) {
                tabsList.value = [tabsList.value[0]];
            } else {
                tabsList.value = [getCurrentTab.value || tabsList.value[0]];
            }
            tabsList.value = tabsList.value.filter(Boolean);
        })

        return {
            tabsList,
            getTabsList,
            getCurrentTab,
            addTabs,
            closeCurrentTab,
            updateTabTitle,
        }
    },
    {
        persist: {
            paths: ['tabsList'],
        },
    },
);