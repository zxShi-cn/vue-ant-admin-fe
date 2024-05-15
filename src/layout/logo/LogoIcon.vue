<template>
    <div class="logo">
        <router-link to="/" class="logo-home">
            <img class="logo-img" src="@/assets/logo.svg" alt="logo">
            <h2 v-if="!collapsed" class="logo-title">Ant-Admin</h2>
        </router-link>
    </div>
</template>

<script setup>
defineProps({
    // 定义一个props，接收父组件传递信息
    collapsed: { // 同步隐藏标题
        type: Boolean,
    },
});

</script>

<style lang="less" scoped>
.logo {
    height: 64px;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: first baseline;
    /* 向左对齐 */
    padding-left: 24px;
    /* background: rgba(255, 255, 255, 0.3); */
    .logo-home {
        display: flex;
    }
}

.logo-img {
    width: 32px;
    height: auto;
    padding: 0 7px 0 0;
}

.logo-title {
    white-space: nowrap; //消除空白符,禁止文字换行
    color: #00B96D;
    margin: 8px 0;
}
</style>