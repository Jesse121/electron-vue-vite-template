<template>
  这里是首页
  <div @click="goLogin">去登录页</div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const goLogin = () => {
  router.push({
    path: "/login",
  });
};
</script>

<style scoped lang="less"></style>
