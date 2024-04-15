import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.less';;

import dayjs from "dayjs";

import i18n from './locales';
import '@arco-themes/vue-mytino2/index.less';
import './style.css'

const app = createApp(App)
app.use(ArcoVue);
app.use(ArcoVueIcon);

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


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
  const formattedDate = dayjs(value, "DD/MM/YYYY").format();
  if(dayjs(formattedDate).isValid()){
    return dayjs(formattedDate).format(formats);
  }
  
  const formattedDate2 = dayjs(value, "YYYY-MM-DD").format();
  if(dayjs(formattedDate2).isValid()){
    return dayjs(formattedDate2).format(formats);
  }

const formattedDate3 = dayjs(value, "DD-MM-YYYY").format();
  if(dayjs(formattedDate3).isValid()){
    return dayjs(formattedDate3).format(formats);
  }

  return '-'


  
}
app.config.globalProperties.$dayjs = dayFormat;
Notification._context = app._context;

 
 
// 3. Set default currency format

const currencyFormatter = (value) => {
 
if(value === 0) {
  return ''
}
  // Use Intl.NumberFormat for other values
  const formattedValue = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(value);

  return formattedValue;
}; 

app.config.globalProperties.$currencyFormatter = currencyFormatter;
app.config.globalProperties.$currency = currencyFormatter;

const UnitFormat = (value, from = 'kb', to = 'gb') => {
  const units = {
      'kb': 1,
      'mb': 1024,
      'gb': 1024 * 1024,
      'tb': 1024 * 1024 * 1024,
  };
  if (!(from in units) || !(to in units)) {
      throw new Error('Đơn vị không hợp lệ');
  }
  const baseValue = value * units[from];

    // Chuyển đổi từ đơn vị cơ bản sang đơn vị đích
    const convertedValue = baseValue / units[to];

    return convertedValue;

}

app.config.globalProperties.$unitFormat = UnitFormat;

app.use(i18n);
app.use(pinia)
useAuthMiddleware(router)
app.use(router)

app.mount('#app')