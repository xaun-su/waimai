import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入 router
import './style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router); // 使用 router
app.use(ElementPlus,{
  locale: zhCn,
});
app.use(pinia)
app.mount('#app');
