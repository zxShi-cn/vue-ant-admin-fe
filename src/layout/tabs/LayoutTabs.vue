<template>
    <div class="tabs-main">
        <a-tabs :active-key="activeKey" hide-add type="editable-card" class="tabs" @change="changePage"
            @edit="editTabItem">
            <a-tab-pane :closable="false" key="/dashboard/welcome" tab="仪表盘"></a-tab-pane>
            <a-tab-pane v-for="tabItem in tabsStore.getTabsList" :tab="tabItem.meta.title" :key="tabItem.fullPath">
            </a-tab-pane>
        </a-tabs>
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
import { useTabsStore } from '@/stores/tabsStore';
import { computed } from 'vue';
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();
// 当前tab的key
const activeKey = computed(() => tabsStore.getCurrentTab?.fullPath);
// 标签页列表
const tabsList = computed(() => tabsStore.getTabsList);

// 关闭当前页面
const removeTab = (tabItem: RouteLocationNormalizedLoaded) => {
    tabsStore.closeCurrentTab(tabItem);
}

// 编辑tabs
const editTabItem = (targetKey: string, action: string) => {
    if (action == 'remove') {
        const targetItem = tabsList.value.find((item: { fullPath: string; }) => item.fullPath === targetKey)
        // console.log(targetItem);
        removeTab(targetItem as RouteLocationNormalizedLoaded);

    }
};
// 切换页面
const changePage = (key: string) => {
    Object.is(route.fullPath, key) || router.push(key);
}
</script>

<style scoped>
.tabs-main {
    border-top: 1px solid #eee;
}

.tabs-view-content {
    height: calc(100vh - 110px - var(--app-footer-height));
    padding: 20px 14px 0;
    overflow: auto;
}
</style>