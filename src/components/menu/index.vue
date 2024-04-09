<template>
  <div class="menu-demo">
    <a-menu  :default-selected-keys="['1']" theme="dark">
      <a-menu-item key="1" @click="handleMenuClick('home')"> <template #icon><icon-apps></icon-apps></template>Tổng quan</a-menu-item>
      <a-sub-menu key="domain">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Tên miền</template>
        <a-menu-item key="domain_register" @click="handleMenuClick('DomainSearch')">Đăng ký tên miền</a-menu-item>
        <a-menu-item key="domain_1"  @click="handleMenuClick('DomainSearch')">Chuyển tên miền về</a-menu-item>
        <a-menu-item key="domain_2" @click="handleMenuClick('domains')" >Gia hạn tên miền</a-menu-item>
        <a-menu-item key="domain_3" @click="handleMenuClick('domains')" >Quản lý tên miền</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="website">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Webiste</template>
        <a-menu-item key="email_register" @click="handleMenuClick('WebsiteManage')">Quản lý website</a-menu-item>
        <a-menu-item key="email_manage" @click="handleMenuClick('CreateWebsite')" >Tạo website mới</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="CloudServer">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Cloud Server</template>
        <a-menu-item key="CloudServer_register" @click="handleMenuClick('DomainSearch')">Đăng ký mới</a-menu-item>
        <a-menu-item key="CloudServer_manage" @click="handleMenuClick('domains')" >Quản lý Cloud Server</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="web-hosting">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Web Hosting</template>
        <a-menu-item key="web-hosting_register" @click="handleMenuClick('DomainSearch')">Đăng ký mới</a-menu-item>
        <a-menu-item key="web-hosting_manage" @click="handleMenuClick('domains')" >Quản lý Web Hosting</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="email">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Email doanh nghiệp</template>
        <a-menu-item key="email_register" @click="handleMenuClick('DomainSearch')">Đăng ký email</a-menu-item>
        <a-menu-item key="email_manage" @click="handleMenuClick('domains')" >Quản lý email</a-menu-item>
      </a-sub-menu>
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