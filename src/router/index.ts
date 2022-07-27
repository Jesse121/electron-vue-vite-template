import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Layout from "@/layout/layout.vue";
import homeComponent from "@/views/home/home.vue";
import loginComponent from "@/views/login/login.vue";
import updateComponent from "@/views/update/update.vue";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/login",
		name: "login",
		meta: {
			title: "登录"
		},
		component: loginComponent
	},
	{
		path: "/home",
		component: Layout,
		redirect: "/home/index",
		meta: {
			title: "首页"
		},
		children: [
			{
				path: "index",
				name: "home",
				component: homeComponent
			}
		]
	},
	{
		path: "/update",
		component: Layout,
		redirect: "/update/index",
		meta: {
			title: "更新"
		},
		children: [
			{
				path: "index",
				name: "update",
				component: updateComponent
			}
		]
	}
];
const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
