<template>
    <a-layout class="layout-main">
        <a-layout-sider class="layout-sider" v-model:collapsed="collapsed" :trigger="null" collapsible>
            <!-- 通过collapsed传递值，同步隐藏标题 -->
            <logo-icon :collapsed="collapsed"></logo-icon>
            <layout-menu :collapsed="collapsed"></layout-menu>
        </a-layout-sider>
        <a-layout>
            <layout-header v-model:collapsed="collapsed"></layout-header>
            <Layout.Content class="layout-content">
                <layout-tabs></layout-tabs>
            </Layout.Content>
            <layout-footer></layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import LogoIcon from '@/layout/logo/LogoIcon.vue';
import LayoutFooter from './footer/LayoutFooter.vue';
import LayoutHeader from './header/LayoutHeader.vue';
import LayoutMenu from './menu/LayoutMenu.vue';
import LayoutTabs from './tabs/LayoutTabs.vue';
import { ref } from 'vue';
import { Layout } from 'ant-design-vue';

const collapsed = ref<boolean>(false);

</script>
<style lang="less" scoped>
.layout-main {
    display: flex;
    /* 设置为flex盒子 */
    width: 100vw;
    min-width: 100%;

    .layout-sider {
        height: 100vh;
        overflow: hidden;
        /* 溢出时隐藏内容 */
    }

    .layout-content {
        flex: none;
        /* 根据自身设置尺寸，完全非弹性的 */
        margin: 24px 16px;
        padding: 24px;
        background: #fff;
        min-height: 72vh;
        overflow: auto;
    }
}
// 隐藏滚动条
// ::-webkit-scrollbar {
//     display: none; /* Chrome Safari */
// }

.ant-layout {
    overflow: auto;
}
</style>