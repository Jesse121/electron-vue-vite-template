import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
app.use(router);
const pinia = createPinia();
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount("#app");
