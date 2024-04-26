<template>
  <div class="menu-demo">
    <a-menu :default-selected-keys="['1']">
      <a-menu-item key="dashboard" @click="handleMenuClick('dashboard')">
        <template #icon><icon-apps size="20"></icon-apps></template>Tổng quan</a-menu-item
      >
      <p class="text-gray-500 p-2 uppercase mt-4">Tên miền</p>

      <a-menu-item key="domain_register" @click="handleMenuClick('DomainSearch')">
        <template #icon><icon-public size="20"></icon-public></template>
        Đăng ký tên miền</a-menu-item
      >
      <a-menu-item key="domain_1" @click="handleMenuClick('DomainSearch')"
        ><template #icon><icon-public size="20"></icon-public></template>Chuyển tên miền
        về</a-menu-item
      >
      <a-menu-item key="domain_2" @click="handleMenuClick('domains')"
        ><template #icon><icon-public size="20"></icon-public></template>Gia hạn tên
        miền</a-menu-item
      >
      <a-menu-item key="domain_3" @click="handleMenuClick('domains')"
        ><template #icon><icon-public size="20"></icon-public></template>Quản lý tên
        miền</a-menu-item
      >

      <p class="text-gray-500 p-2 uppercase mt-4">Dịch vụ</p>
      <a-menu-item key="email_register" @click="handleMenuClick('WebsiteManage')"
        ><template #icon><icon-computer size="20"></icon-computer></template>Website</a-menu-item
      >
      <a-menu-item
        key="CloudServer_manage"
        @click="router.push({ path: '/clientarea/services/vps-pro' })"
        ><template #icon><icon-layers size="20"></icon-layers></template>Cloud Server</a-menu-item
      >
      <a-menu-item
        key="web-hosting_manage"
        @click="router.push({ path: '/clientarea/services/cloud-hosting' })"
      >
        <template #icon><icon-storage size="20"></icon-storage></template>Web Hosting</a-menu-item
      >
      <a-menu-item
        key="email_manage"
        @click="router.push({ path: '/clientarea/services/unlimited-email' })"
      >
        <template #icon><icon-email size="20"></icon-email></template>Quản lý email</a-menu-item
      >

      <p class="text-gray-500 p-2 uppercase mt-4">Tài chính</p>
      <a-menu-item key="invoice" @click="router.push({ path: '/clientarea/invoices' })">
        <template #icon><icon-email size="20"></icon-email></template>Hoá đơn</a-menu-item
      >
      <!-- <a-menu-item key="emiset" @click="router.push({path: '/cart/bussiness-email'})"> <template #icon><icon-email size="20"></icon-email></template>Báo giá</a-menu-item> -->
    </a-menu>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const handleMenuClick = (name) => {
  router.push({ name })
}
</script>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 100%;
}
</style>
