import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./styles/reset.scss";
import router from "./router/router";

const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
