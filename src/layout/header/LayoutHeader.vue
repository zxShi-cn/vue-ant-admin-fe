<template>
    <a-layout-header class="layout-header">
        <div class="header-fold">
            <menu-unfold-outlined v-if="collapsed" class="trigger"
                @click="() => $emit('update:collapsed', !collapsed)" />
            <menu-fold-outlined v-else class="trigger" @click="() => $emit('update:collapsed', !collapsed)" />
        </div>

        <a-breadcrumb class="header-bread">
            <a-breadcrumb-item href="/">
                <home-outlined />
            </a-breadcrumb-item>
            <a-breadcrumb-item href="">
                <user-outlined />
                <span>Application List</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>Application</a-breadcrumb-item>
        </a-breadcrumb>
        <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }">
            <template #icon>
                <AntDesignOutlined />
            </template>
        </a-avatar>
    </a-layout-header>
</template>

<script setup lang="ts">
import {
    HomeOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AntDesignOutlined,
} from '@ant-design/icons-vue';

// 定义数据，接收父组件传值
defineProps({
    collapsed: {
        type: Boolean,
    },
})

</script>

<style lang="less" scoped>
.layout-header {
    background: #fff;
    display: flex;
    position: sticky;
    z-index: 10;
    top: 0;
    align-items: center;
    /* 居中对齐 */
    justify-content: space-between;
    /* 首元素在头，尾元素在尾，均匀分布 */
    height: var(--app-header-height);
    padding: 0px 20px;

    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
    }

    .header-bread {
        flex: 1;
        align-items: center;
        min-width: 0;
    }
}
</style>