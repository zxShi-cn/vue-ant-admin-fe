<template>
    <Menu.Item :key="item?.name" @click="handleMenuItem(item)">
        <MenuItemContent :collasped="false" :item="item"> </MenuItemContent>
    </Menu.Item>
</template>

<script setup lang="ts">
import { Menu } from 'ant-design-vue';
import MenuItemContent from './MenuItemContent.vue'
import { useRouter, type RouteRecordRaw } from 'vue-router';
import type { PropType } from 'vue';

defineProps({
    item: {
        type: Object as PropType<RouteRecordRaw>,
        default: () => ({}),
    },
});
// 获取路由
const router = useRouter();

const handleMenuItem = async (item: RouteRecordRaw) => {
    const { isExternal, externalOpenMode } = item.meta || {};
    // 检查是否为外链
    if (isExternal && externalOpenMode !== 2) {
        window.open(item.path);
    } else {
        router.push({ name: item.name });
    }
}
</script>

<style scoped></style>