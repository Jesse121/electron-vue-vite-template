<template>
	<div>这里是首页</div>
	<el-button @click="goLogin">去登录页</el-button>
	<p>{{ count }}</p>
	<p>
		<el-button @click="increment">count ++</el-button>
	</p>
	<p>
		<el-button @click="openNewWindow">打开新窗口</el-button>
	</p>
	<p>
		<el-button @click="sendToOtherWin">发消息给更新窗口</el-button>
	</p>
	<p>
		<el-button @click="checkUpdate">检查更新</el-button>
	</p>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useCounterStore } from "@/stores/counter";
import { ipcRendererInvoke, ipcRendererSend, ipcRendererSendTo } from "@/utils/ipcRenderer";

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

const localStorageContent = localStorage.getItem("electronOtherWinId");
let otherWinId = 0;
if (localStorageContent) {
	otherWinId = parseInt(localStorageContent);
}

const openNewWindow = () => {
	ipcRendererSend("openOtherWin");
};

const sendToOtherWin = () => {
	ipcRendererSendTo(otherWinId, "sendToOtherWin", "这是来自主窗口的消息");
};

const checkUpdate = () => {
	ipcRendererInvoke("checkUpdate").then(res => {
		if (res) {
			router.push({ path: "/update" });
		}
	});
};
</script>

<style scoped lang="less"></style>
