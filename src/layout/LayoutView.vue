<template>
    <a-layout class="layout-main">
        <a-layout-sider class="layout-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
            <!-- 通过collapsed传递值，同步隐藏标题 -->
            <logo-icon :collapsed="collapsed"></logo-icon>
            <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <user-outlined />
                    <span>nav 1</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <video-camera-outlined />
                    <span>nav 2</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <upload-outlined />
                    <span>nav 3</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <layout-header v-model:collapsed="collapsed"></layout-header>
            <a-layout-content class="layout-content"
                :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '72vh' }">
                Content
            </a-layout-content>
            <layout-footer></layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import LogoIcon from '@/layout/logo/LogoIcon.vue';
import LayoutFooter from './footer/LayoutFooter.vue';
import LayoutHeader from './header/LayoutHeader.vue';
import { ref } from 'vue';
import {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import service from '@/utils/request';
// import axios from 'axios';
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);

// // 测试
// let result = await service.get('api/hello');
// console.log(result.data);
</script>
<style lang="less" scoped>
.layout-main {
    display: flex;
    /* 设置为flex盒子 */
    width: 100vw;
    min-width: 100%;
    overflow: hidden;

    .layout-sider {
        overflow: hidden;
        /* 溢出时隐藏内容 */
    }

    .layout-content {
        flex: none;
        /* 根据自身设置尺寸，完全非弹性的 */
    }

    .ant-layout {
        overflow: hidden;
    }
}
</style>