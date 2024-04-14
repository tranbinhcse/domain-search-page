import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.less';
// import '@arco-themes/vue-mytino/index.less'
// import { Notification } from '@arco-design/web-vue';

import dayjs from "dayjs";

import i18n from './locales';

  
// import '@arco-design/web-vue/dist/arco.less';
import '@arco-themes/vue-mytino2/index.less';
import './style.css'

const app = createApp(App)
app.use(ArcoVue);
app.use(ArcoVueIcon);

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

import routes from './routers'
import { useAuthMiddleware } from './middlewares/authMiddleware'
const router = createRouter({
  history: createWebHistory(),
  routes
})




 
// import vi from "dayjs/locale/vi";
  
app.use(dayjs);

const dayFormat = (value, formats = "DD/MM/YYYY") => {
 
  if(value == '0000-00-00') {
    return '-'
  }
  if(dayjs(value).isValid()){
    return dayjs(value).format(formats);
  } else {
    return '-'
  }

   


  
}
app.config.globalProperties.$dayjs = dayFormat;
Notification._context = app._context;

 


// const messages = Object.assign(languages)
// const i18n = createI18n({
//     legacy: false,
//     locale: localStorage.getItem('locale') || 'vi',
//     fallbackLocale: 'vi',
//     messages: messages
// })

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