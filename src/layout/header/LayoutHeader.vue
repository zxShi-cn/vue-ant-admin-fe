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
        <a-dropdown class="header-avatar" placement="bottom">
            <div>
                <a-avatar class="avatar" :src="userInfo.avatar" :alt="userInfo.username"
                    :size="{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }">
                    <template #icon>
                        <AntDesignOutlined />
                    </template>
                </a-avatar>
                <div>{{ userInfo.username }}</div>
            </div>
            <template #overlay>
                <a-menu>
                    <a-menu-item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                            1st menu item
                        </a>
                    </a-menu-item>
                    <a-menu-item>
                        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                            2nd menu item
                        </a>
                    </a-menu-item>
                    <a-menu-item @click="logout">
                        退出登录
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </a-layout-header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import {
    HomeOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AntDesignOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';

// 定义数据，接收父组件传值
defineProps({
    collapsed: {
        type: Boolean,
    },
})

// 获取用户信息
const userStore = useUserStore();
const router = useRouter();
const userInfo = userStore.userInfo;

const logout = () => {
    router.push({path: '/login'});
    userStore.clearLoginStatus();
}

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
    padding: 0px 20px 0 0;

    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
        background: rgba(0, 0, 0, 0.025);
    }

    .header-bread {
        flex: 1;
        align-items: center;
        min-width: 0;
    }

    .header-avatar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        margin-right: 1rem;
        color: #000000A6;
        .avatar {
            margin-right: 5px;
        }
    }

    .header-avatar:hover {
        background: rgba(0, 0, 0, 0.025);
    }
}
</style>