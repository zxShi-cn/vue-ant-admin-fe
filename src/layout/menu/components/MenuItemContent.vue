<template>
    <template v-if="item?.meta?.icon">
        <span>图标</span>
    </template>
    <span v-show="!$props.collasped"> {{ item?.meta?.title }}</span>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

defineProps({
    collasped: {
        type: Boolean,
        default: true,
    },
    item: {
        type: Object as PropType<RouteRecordRaw>,
        default: () => ({}),
    },
});
</script>

<style scoped></style>