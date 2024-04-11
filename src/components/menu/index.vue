<template>
  <div class="menu-demo">
    <a-menu  :default-selected-keys="['1']" theme="dark">
      <a-menu-item key="1" @click="handleMenuClick('home')"> <template #icon><icon-apps></icon-apps></template>Tổng quan</a-menu-item>
      <p class="text-gray-500 p-2 uppercase mt-4">Tên miền</p>
       
      <a-menu-item key="domain_register" @click="handleMenuClick('DomainSearch')">
        <template #icon><icon-public></icon-public></template>
        Đăng ký tên miền</a-menu-item>
      <a-menu-item key="domain_1"  @click="handleMenuClick('DomainSearch')"><template #icon><icon-public></icon-public></template>Chuyển tên miền về</a-menu-item>
      <a-menu-item key="domain_2" @click="handleMenuClick('domains')" ><template #icon><icon-public></icon-public></template>Gia hạn tên miền</a-menu-item>
      <a-menu-item key="domain_3" @click="handleMenuClick('domains')" ><template #icon><icon-public></icon-public></template>Quản lý tên miền</a-menu-item>
    
      <p class="text-gray-500 p-2 uppercase mt-4">Dịch vụ</p>
      <a-menu-item key="email_register" @click="handleMenuClick('WebsiteManage')"><template #icon><icon-computer></icon-computer></template>Website</a-menu-item>
      <a-menu-item key="CloudServer_manage" @click="router.push({path: '/clientarea/cloud-servers'})" ><template #icon><icon-layers></icon-layers></template>Cloud Server</a-menu-item>
      <a-menu-item key="web-hosting_manage" @click="router.push({path: '/clientarea/cloud-hosting'})" > <template #icon><icon-storage></icon-storage></template>Web Hosting</a-menu-item>
      <a-menu-item key="email_manage" @click="router.push({path: '/clientarea/bussiness-email'})" > <template #icon><icon-email></icon-email></template>Quản lý email</a-menu-item>
     
      <a-sub-menu key="website">
        <template #icon><icon-computer></icon-computer></template>
        <template #title>Webiste</template>
        <a-menu-item key="email_manage" @click="handleMenuClick('CreateWebsite')" >Tạo website mới</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="CloudServer">
        <template #icon><icon-layers></icon-layers></template>
        <template #title>Cloud Server</template>
        <a-menu-item key="CloudServer_register" @click="router.push({path: '/cart/cloud-servers'})">Đăng ký mới</a-menu-item>
        <a-menu-item key="CloudServer_manage" @click="router.push({path: '/clientarea/cloud-servers'})" >Quản lý Cloud Server</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="web-hosting">
        <template #icon><icon-storage></icon-storage></template>
        <template #title>Web Hosting</template>
        <a-menu-item key="web-hosting_register" @click="router.push({path: '/cart/cloud-hosting'})">Đăng ký mới</a-menu-item>
        <a-menu-item key="web-hosting_manage" @click="router.push({path: '/clientarea/cloud-hosting'})" >Quản lý Web Hosting</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="email">
        <template #icon><icon-email></icon-email></template>
        <template #title>Email doanh nghiệp</template>
        <a-menu-item key="email_register" @click="router.push({path: '/cart/bussiness-email'})">Đăng ký email</a-menu-item>
        <a-menu-item key="email_manage" @click="router.push({path: '/clientarea/bussiness-email'})" >Quản lý email</a-menu-item>
      </a-sub-menu>
      <p class="text-gray-500 p-2 uppercase mt-4">Tài chính</p>
      <a-menu-item key="invoice" @click="router.push({path: '/cart/bussiness-email'})"> <template #icon><icon-email></icon-email></template>Hoá đơn</a-menu-item>
      <a-menu-item key="emiset" @click="router.push({path: '/cart/bussiness-email'})"> <template #icon><icon-email></icon-email></template>Báo giá</a-menu-item>

    </a-menu>
  </div>
</template>
<script setup>

import { useRouter } from 'vue-router'
const router = useRouter()

const handleMenuClick = (name) => {
  router.push({name})
}

</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
   
  background-color: var(--color-neutral-2);
}
</style>