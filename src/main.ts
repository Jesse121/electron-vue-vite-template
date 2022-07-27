import "@/styles/index.less";
import "normalize.css/normalize.css";
import "element-plus/dist/index.css";
import "vue-global-api";

import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { createPinia } from "pinia";
import { createApp } from "vue";

import SvgIcon from "@/components/SvgIcon/index.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.component("SvgIcon", SvgIcon);
app.use(router);
app.use(createPinia());
app.use(ElementPlus, {
	locale: zhCn
});
app.mount("#app");
