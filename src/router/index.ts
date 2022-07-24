import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import homeComponent from "@/views/home/home.vue";
import loginComponent from "@/views/login/login.vue";
import updateComponent from "@/views/update/update.vue";

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
	},
	{
		path: "/update",
		name: "update",
		meta: {
			title: "更新"
		},
		component: updateComponent
	}
];
const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
