import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import homeComponent from "@/views/home/home.vue";
import loginComponent from "@/views/login/login.vue";

const routes: RouteRecordRaw[] = [
	{
		path: "/login",
		name: "login",
		meta: {
			title: "登录"
		},
		component: loginComponent
	},
	{
		path: "/",
		name: "home",
		meta: {
			title: "首页"
		},
		component: homeComponent
	}
];
const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
