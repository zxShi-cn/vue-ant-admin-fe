<template>
    <a-breadcrumb class="header-bread">
        <a-breadcrumb-item href>
            <router-link to="/dashboard/welcome">
                <home-outlined />
            </router-link>
        </a-breadcrumb-item>
        <template v-for="(routeItem, routeIndex) in menus" :key="routeItem?.name">
            <a-breadcrumb-item>
                {{ routeItem?.meta?.title }}
                <template v-if="routeItem?.children?.length" #overlay>
                    <a-menu :selected-keys="getSelectKeys(routeIndex)">
                        <template v-for="childItem in routeItem?.children" :key="childItem.name">
                            <a-menu-item v-if="!childItem.meta?.hideInMenu && !childItem.meta?.hideInBreadcrumb"
                                :key="childItem.name" @click="clickMenuItem(childItem)">
                                {{ childItem.meta?.title }}
                            </a-menu-item>
                        </template>
                    </a-menu>
                </template>
            </a-breadcrumb-item>
        </template>

    </a-breadcrumb>
</template>

<script setup lang="ts">
import {
    HomeOutlined,
} from '@ant-design/icons-vue';
import { computed } from 'vue';
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router';

const route = useRoute();
const router = useRouter();

const menus = computed(() => {
    // 获取当前页面的父级信息
    return route.matched;
})

// 点击菜单
const clickMenuItem = (menuItme: RouteRecordRaw) => {
    const { isExternal, externalOpenMode, type } = menuItme?.meta || {};
    if (type === 0 && !menuItme.redirect) return;
    // 如果是外链
    if (isExternal && externalOpenMode === 1) {
        window.open(menuItme.path);
    } else {
        const to = typeof menuItme.redirect === 'string' ? menuItme.redirect : menuItme;
        router.push(to);
    }
}
// 在菜单中选中当前页面
const getSelectKeys = (routeIndex: number) => {
    return [menus.value[routeIndex + 1]?.name] as string[];
}

</script>

<style scoped></style>