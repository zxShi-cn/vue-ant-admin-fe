<template>
    <!-- 目录 -->
    <Menu.SubMenu v-if="isShowSubMenu(item)" :key="item?.name">
        <template #title>
            <MenuItemContent :collasped="collapsed" :item="item"></MenuItemContent>
        </template>
        <template v-for="child in item.children || []" :key="child.name">
            <MenuItem :item="child">
            </MenuItem>
        </template>
    </Menu.SubMenu>
    <!-- 菜单 -->
    <MenuItem v-else :item="item">
    </MenuItem>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { Menu } from 'ant-design-vue';
import MenuItemContent from './MenuItemContent.vue';
import MenuItem from "./MenuItem.vue";

defineProps({
    collapsed: {
        type: Boolean,
    },
    item: {
        type: Object as PropType<RouteRecordRaw>,
        default: () => ({}),
    }
});

const isShowSubMenu = (menuItem: RouteRecordRaw) => {
    return (
        // 是否隐藏子菜单
        menuItem?.meta?.type === 0 ||
        (!Object.is(menuItem?.meta?.hideChildrenInMenu, true) && menuItem?.children?.length)
    )
}

</script>

<style scoped></style>