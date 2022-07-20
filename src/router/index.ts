import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

import loginComponent from "@/views/login/login.vue";
import homeComponent from "@/views/home/home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
    },
    component: loginComponent,
  },
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
    },
    component: homeComponent,
  },
];
const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

export default router;
