<template>
  <div>
    <Spin :spinning="loading" size="large">
      <iframe class="iframe-main" :src="currentRoute" ref="frameRef" @load="hideLoading">
      </iframe>
    </Spin>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, unref } from 'vue';
import { useRoute } from 'vue-router';
import { Spin } from 'ant-design-vue';

defineOptions({ name: 'FrameBlank' });

const emit = defineEmits(['message']);
const route = useRoute();

const currentRoute = computed(() => route.meta?.iframeSrc as string);
const loading = ref(true);
// 获取iframe实例
const frameRef = ref<HTMLIFrameElement>()

const calcHeight = () => {
  const iframe = unref(frameRef);
  if (!iframe) return;
  const top = 65;
  const clientHeight = document.documentElement.clientHeight - top;
  iframe.style.height = `${clientHeight}px`;
}

const hideLoading = () => {
  loading.value = false;
  calcHeight();
}

const messageHandler = (e: MessageEvent) => {
  emit('message', e.data)
}

const postMessage = (message: any, tragetOrigin: string, transfer?: Transferable[]) => {
  const iframe = unref(frameRef);
  if (!iframe) return;
  iframe.contentWindow?.postMessage(message, tragetOrigin, transfer);
}

const reload = () => {
  loading.value = true;
  const iframe = unref(frameRef);
  if (!iframe) return;
  iframe.contentWindow?.location.reload();
  loading.value = false;
}

onMounted(() => {
  window.addEventListener('message', messageHandler);
})

onUnmounted(() => {
  window.removeEventListener('message', messageHandler);
})

defineExpose({ postMessage, reload});
</script>

<style lang="less" scoped>
.iframe-main {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
  border: 0;
  background-color: white;
}
</style>