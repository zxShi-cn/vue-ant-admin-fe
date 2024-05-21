<template>
    <div class="tabs-main">
        <div class="tabs-content">
            <router-view #="{ Component }">
                <template v-if="Component">
                    <Suspense>
                        <Transition>
                            <component :is="Component" :key="route.fullPath" />
                        </Transition>
                        <template #fallback> 正在加载... </template>
                    </Suspense>
                </template>
            </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();




</script>

<style scoped></style>