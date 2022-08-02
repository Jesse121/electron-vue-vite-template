<template>
	<div>这里是新开的窗口</div>
	<div>{{ content }}</div>
</template>

<script setup lang="ts">
import { ipcRendererOn } from "@/utils/ipcRenderer";

const content = ref("");
onMounted(() => {
	ipcRendererOn("sendToOtherWin", (event, args) => {
		content.value = args;
	});
});
</script>

<style scoped lang="less"></style>
