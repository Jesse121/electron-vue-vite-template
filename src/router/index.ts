import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Layout from "@/layout/layout.vue";
import homeComponent from "@/views/home/home.vue";
import loginComponent from "@/views/login/login.vue";
import otherComponent from "@/views/other/other.vue";
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
		path: "/other",
		component: Layout,
		redirect: "/other/index",
		meta: {
			title: "新开窗口"
		},
		children: [
			{
				path: "index",
				name: "other",
				component: otherComponent
			}
		]
	},
	{
		// 更新窗口
		path: "/update",
		component: updateComponent
	}
];
const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
