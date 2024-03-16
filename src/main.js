import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import dayjs from "dayjs";

import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import vi from '@/locales/vi.json'

export const languages = {
    en: en,
    vi: vi,
}
  
import './style.css'

const app = createApp(App)

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

import routes from './routes'
import { useAuthMiddleware } from './middlewares/authMiddleware'
const router = createRouter({
  history: createWebHistory(),
  routes
})




 
// import vi from "dayjs/locale/vi";
  
 
dayjs().locale(vi).format();

app.config.globalProperties.$dayjs = dayjs;
app.use(dayjs);
 


const messages = Object.assign(languages)
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || 'vi',
    fallbackLocale: 'vi',
    messages: messages
})

app.use(i18n);


// 3. Set default currency format

const currencyFormatter = (value) => {
 

  // Use Intl.NumberFormat for other values
  const formattedValue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(value);

  return formattedValue;
};


// const currencyFormatter = new Intl.NumberFormat('vi-VN', {
//   style: 'currency',
//   currency: 'VND',
//   minimumFractionDigits: 0,
// });


app.config.globalProperties.$currencyFormatter = currencyFormatter;
app.config.globalProperties.$currency = currencyFormatter;




useAuthMiddleware(router)
app.use(router)

app.mount('#app')