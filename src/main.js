import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 导入element plus的图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(createPinia())
app.use(router).use(ElementPlus)
app.mount('#app')
