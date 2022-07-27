<template>
	<div>这里是首页</div>
	<el-button @click="goLogin">去登录页</el-button>
	<p>{{ count }}</p>
	<el-button @click="increment">count ++</el-button>
	<el-button @click="sendToUpdateWin">发消息给更新窗口</el-button>
</template>

<script setup lang="ts">
// import remote from "@electron/remote";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useCounterStore } from "@/stores/counter";
import { ipcRendererSendTo } from "@/utils/ipcRender";

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

// const shareObject = window.require("@electron/remote").getGlobal("shareObject");
// console.log(shareObject);
log.info("aaa");
console.log(log);

const sendToUpdateWin = () => {
	ipcRendererSendTo(2, "sendToUpdateWin", "这是来自主窗口的消息");
};
</script>

<style scoped lang="less"></style>
