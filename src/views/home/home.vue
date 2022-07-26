<template>
	<div>这里是首页</div>
	<el-button @click="goLogin">去登录页</el-button>
	<p>{{ count }}</p>
	<el-button @click="increment">count ++</el-button>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useCounterStore } from "@/stores/counter";

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
</script>

<style scoped lang="less"></style>
