import "./style.css";
import "normalize.css/normalize.css";
import "element-plus/dist/index.css";

import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(ElementPlus, {
	locale: zhCn
});
app.mount("#app");
