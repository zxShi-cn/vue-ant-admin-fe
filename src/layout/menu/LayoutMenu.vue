<template>
    <div class="menu-main">
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :open-keys="openKeys"
            :collapsed="collapsed" collapsible @click="clickMenuItem">
            <template v-for="item in menus" :key="item.name">
                <sub-menu-item :collapsed="props.collapsed" :item="item"></sub-menu-item>
            </template>
        </a-menu>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { usePermissionStore } from '@/stores/permissionStore';
import SubMenuItem from './components/SubMenuItem.vue'
import { type MenuProps } from 'ant-design-vue/es/menu/src/Menu';
import { useRoute, useRouter } from 'vue-router';
import { LOGIN_NAME } from '@/router/constant';

const permissionStore = usePermissionStore();
// 获取当前路由
const currentRoute = useRoute();
const router = useRouter();

const props = defineProps({
    collapsed: {
        type: Boolean,
        default: true,
    }
})

// 选中的菜单
const selectedKeys = ref<string[]>([currentRoute.name as string]);
const menus = computed(() => [...permissionStore.menuList, ...permissionStore.externalLink]);
const openKeys = ref<string[]>([]);

// 获取当前打开的子菜单
const getOpenKeys = () => {
    return (
        currentRoute.meta?.namePath ?? (currentRoute.matched.slice(1).map((n) => n.name) as string[])
    );
}

// 监听菜单收缩状态
watch(
    () => props.collapsed,
    () => {
        selectedKeys.value = [currentRoute.name] as string[];
        setTimeout(() => {
            openKeys.value = getOpenKeys() as string[];
        });
    },
);

// 切换菜单选中状态
watch(
    () => currentRoute.fullPath,
    () => {
        selectedKeys.value = [currentRoute.meta?.activeMenu ?? currentRoute.name] as string[];
        if (currentRoute.name === LOGIN_NAME || props.collapsed) return;
        openKeys.value = getOpenKeys() as string[];
    },
    {
        immediate: true,
    }
)

// 查找对应路由
const getRouteByName = (name: string) => {
    return router.getRoutes().find((n) => n.name === name)
}

// 点击菜单
const clickMenuItem: MenuProps['onClick'] = ({ key }) => {
    // 和当前路由一样
    if (key === currentRoute.name) return;
    // 选中的菜单
    const preSelectKey = selectedKeys.value;
    const targetRoute = getRouteByName(key as string);
    const { isExternal, externalOpen } = targetRoute?.meta || {};
    if (targetRoute && isExternal && externalOpen === 1) {
        queueMicrotask(() => {
            selectedKeys.value = preSelectKey;
        })
    }
}
</script>

<style scoped>
.menu-main {
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }

    &.is-side-menu {
        height: calc(100vh - var(--app-header-height));
    }

    &> :deep(.ant-menu) {
        justify-content: center;
        width: 100%;
    }
}
</style>