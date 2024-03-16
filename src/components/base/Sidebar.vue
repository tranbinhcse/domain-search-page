<template>
  <div
    class="left-0 top-0 h-full transition-all"
    :class="{'left-[-280px]': !appState.showSidebar}"
  >
    <ul>
      <li v-for="menu in menus" :key="menu.text">
        <router-link :to="{ name: menu.routeName }"
          class="menu flex px-3 py-3 my-1 rounded-md"
          active-class="active"
        >
          <img :src="menu.icon" class="grayscale" />
          <span class="pl-4 text-gray text-sm">{{ menu.text }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>

import { useAppStore } from '@/stores/appStore'
const appState = useAppStore()

import homeIcon from '@/assets/icons/home.svg'
import cloudIcon from '@/assets/icons/cloud.svg'
import domainIcon from '@/assets/icons/domain.svg'
import domainRegisterIcon from '@/assets/icons/domain-register.svg'
import domainRenewIcon from '@/assets/icons/domain-renew.svg'
import domainTransferIcon from '@/assets/icons/domain-transfer.svg'
import invoiceIcon from '@/assets/icons/invoice.svg'
import costIcon from '@/assets/icons/cost.svg'
import affliateIcon from '@/assets/icons/affliate.svg'
import supportIcon from '@/assets/icons/support.svg'
import ticketIcon from '@/assets/icons/ticket.svg'
import knowledgeIcon from '@/assets/icons/knowledge.svg'
import downloadIcon from '@/assets/icons/download.svg'
import faqIcon from '@/assets/icons/faq.svg'

const menus = [
  { text: 'Dashboard', routeName: 'home', icon: homeIcon },
  { text: 'Cloud Hosting', routeName: 'cloudHosting', icon: cloudIcon },
  { text: 'Quản lý tên miền', routeName: 'domainManage', icon: domainIcon },
  { text: 'Đăng ký tên miền', routeName: 'DomainSearch', icon: domainRegisterIcon },
  { text: 'Gia hạn tên miền', routeName: 'hello', icon: domainRenewIcon },
  { text: 'Chuyển tên miền', routeName: 'hello', icon: domainTransferIcon },
  { text: 'Hóa đơn', routeName: 'invoiceManage', icon: invoiceIcon },
  { text: 'Báo giá', routeName: 'hello', icon: costIcon },
  { text: 'Affiliate', routeName: 'hello', icon: affliateIcon },
  { text: 'Supports Center', routeName: 'hello', icon: supportIcon },
  { text: 'Tickets', routeName: 'hello', icon: ticketIcon },
  { text: 'Knowledgebase', routeName: 'hello', icon: knowledgeIcon },
  { text: 'Download', routeName: 'hello', icon: downloadIcon },
  { text: 'FAQs', routeName: 'hello', icon: faqIcon }
]



</script>

<style scoped>
.active, .menu:hover {
  @apply bg-green-200;
}
.active img, .menu:hover img {
  @apply grayscale-0;
}
.active span, .menu:hover span {
  @apply text-green-500;
}
</style>