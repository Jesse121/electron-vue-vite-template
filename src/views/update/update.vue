<template>
	<div>这里是更新窗口</div>
	<div>{{ content }}</div>
</template>

<script setup lang="ts">
import { ipcRendererOn } from "@/utils/ipcRenderer";

const content = ref("");
ipcRendererOn("sendToUpdateWin", (event, args) => {
	content.value = args;
});
</script>

<style scoped lang="less"></style>
