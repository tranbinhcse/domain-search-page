<template>
  <div class="menu-demo">
    <a-menu mode="horizontal" :default-selected-keys="['1']">
      <a-menu-item key="1" >Trang chủ</a-menu-item>
      <a-menu-item key="2" @click="handleMenuClick('domains')">Tên miền</a-menu-item>
      <a-menu-item key="website" @click="handleMenuClick('website')">Website</a-menu-item>
      <a-menu-item key="invoice" @click="handleMenuClick('invoices')">Hoá đơn</a-menu-item>
      <a-menu-item key="support" @click="handleMenuClick('support')">Hỗ trợ</a-menu-item>
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