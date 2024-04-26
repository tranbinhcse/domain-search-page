<template>
  <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
    <div class="flex bg-red grow px-8">
      <breadcrumb />
      <div class="grow flex gap-x-4 justify-end items-center">
        <service-menu />
        <profile-menu />
      </div>
    </div>
  </div>
</template>
<script setup>
import Breadcrumb from './Breadcrumb.vue'
import { useAppStore } from '@/stores/appStore'
const { toggleSidebar } = useAppStore()
import DropdownMenu from './DropdownMenu.vue'
import Button from './Button.vue'
import ProfileMenu from '../general/user/ProfileMenu.vue'
import ServiceMenu from '../general/ServiceMenu.vue'
</script>

<style></style>
