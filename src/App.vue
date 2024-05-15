<script setup>

</script>

<template>
  <!-- 路由显示 -->
  <router-view #="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>

<style scoped>

</style>
