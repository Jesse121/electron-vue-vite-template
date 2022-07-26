<template>
	<div>这里是登录页</div>
	<el-button @click="goHome">回首页</el-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const goHome = () => {
	router.push({
		path: "/"
	});
};
</script>

<style scoped lang="less"></style>
