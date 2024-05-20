<template>
    <Menu.Item :key="item?.name" @click="handleMenuItem(item)">
        <MenuItemContent :collasped="false" :item="item"> </MenuItemContent>
    </Menu.Item>
</template>

<script setup lang="ts">
import { Menu } from 'ant-design-vue';
import MenuItemContent from './MenuItemContent.vue'
import { useRouter, type RouteRecordName, type RouteRecordRaw } from 'vue-router';
import type { PropType } from 'vue';
import { useUserStore } from '@/stores/userStore';

defineProps({
    item: {
        type: Object as PropType<RouteRecordRaw>,
        default: () => ({}),
    },
});
// 获取路由
const router = useRouter();
const userStore = useUserStore();

const searchRoute = (name: RouteRecordName) => {
    return router.hasRoute(name);
}

const handleMenuItem = async (item: RouteRecordRaw) => {
    const { isExternal, externalOpen } = item.meta || {};
    // 检查是否为外链
    if (isExternal && externalOpen !== 2) {
        window.open(item.path);
    } else {
        // 如果路由不存在，重新加载路由
        if (!searchRoute(item.name as any)) {
            await userStore.reloadRoutes(router);
            if (!searchRoute(item.name as any)) {
                console.log("未成功加载");
            }
        }
        router.push({ name: item.name });
    }
}
</script>

<style scoped></style>