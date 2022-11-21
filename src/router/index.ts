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
		component: () => import("@/views/login/login.vue")
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
				// component: homeComponent
				component: () => import("@/views/home/home.vue")
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
				// component: otherComponent
				component: () => import("@/views/other/other.vue")
			}
		]
	},
	{
		// 更新窗口
		path: "/update",
		component: () => import("@/views/update/update.vue")
	}
];
const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
