import { createApp } from "vue";
import App from "@/app/App.vue";
import { registerProviders } from "@/app/providers";
import "@/app/styles/main.scss";

const app = createApp(App);
registerProviders(app);
app.mount("#app");
