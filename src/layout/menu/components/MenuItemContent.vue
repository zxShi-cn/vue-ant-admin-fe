<template>
    <template v-if="item?.meta?.icon">
        <antIcon :icon="item?.meta?.icon as string"></antIcon>
    </template>
    <span v-show="!$props.collasped"> {{ item?.meta?.title }}</span>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { antIcon } from '@/components/icon';

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