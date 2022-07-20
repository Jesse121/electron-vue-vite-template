<template>
  这里是首页
  <el-button @click="goLogin">去登录页</el-button>
  <p>{{ count }}</p>
  <el-button @click="increment">count ++</el-button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
// import { useCounterStore } from "../../stores/counter";
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const router = useRouter();
const goLogin = () => {
  router.push({
    path: "/login",
  });
};

const counter = useCounterStore();
const { count } = storeToRefs(counter);
const increment = () => {
  counter.increment();
};
</script>

<style scoped lang="less"></style>
