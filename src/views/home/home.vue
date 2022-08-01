<template>
	<div>这里是首页</div>
	<el-button @click="goLogin">去登录页</el-button>
	<p>{{ count }}</p>
	<el-button @click="increment">count ++</el-button>
	<el-button @click="sendToUpdateWin">发消息给更新窗口</el-button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useCounterStore } from "@/stores/counter";
import { ipcRendererSendTo } from "@/utils/ipcRenderer";

const router = useRouter();
const goLogin = () => {
	router.push({
		path: "/login"
	});
};

const counter = useCounterStore();
const { count } = storeToRefs(counter);
const increment = () => {
	counter.increment();
};

const localStorageContent = localStorage.getItem("electronUpdateWinId");
let updateWinId = 0;
if (localStorageContent) {
	updateWinId = parseInt(localStorageContent);
}

const sendToUpdateWin = () => {
	ipcRendererSendTo(updateWinId, "sendToUpdateWin", "这是来自主窗口的消息");
};
</script>

<style scoped lang="less"></style>
