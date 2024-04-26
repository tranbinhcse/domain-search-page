<template>
  <div class="max-w-7xl mx-auto pt-5">
    <div
      class="rounded-md"
      :style="{
        backgroundImage: 'radial-gradient(var(--color-fill-3) 1px, rgba(255, 255,255, 1) 1px)',
        backgroundSize: '16px 16px',
        padding: '28px 0 0'
      }"
    >
      <a-page-header :title="service.name">
        <template #subtitle>
          <a-space>
            <span>{{ service.domain }}</span>
            <a-tag color="gray" size="mini" class="rounded-lg">dns</a-tag>
          </a-space>
        </template>
        <template #breadcrumb> </template>
        <template #extra>
          <a-tooltip content="Login cPanel">
            <a-button type="icon"><icon-user size="26" class="text-gray-400" /></a-button>
          </a-tooltip>
        </template>
      </a-page-header>
      <a-tabs size="large" @change="handleTabClick" hide-content="true">
        <a-tab-pane key="Overview">
          <template #title> <icon-calendar /> Overview </template>
        </a-tab-pane>
      </a-tabs>
    </div>

    <a-tabs size="large" hide-tab="true" position="bottom" :active-key="tabActive">
      <a-tab-pane key="Overview">
        <div class="bg-white p-4 rounded">
          <a-descriptions title="Service Summary" :column="1">
            <a-descriptions-item span="1" label="IP">
              {{ service.ip }}
            </a-descriptions-item>
            <a-descriptions-item span="1" label="Username">
              {{ service.username }}
            </a-descriptions-item>
            <a-descriptions-item span="1" label="Password">
              {{ service.password }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </a-tab-pane>

      <a-tab-pane key="Settings">Settings</a-tab-pane>
      <a-tab-pane key="Snapshots">2</a-tab-pane>
      <a-tab-pane key="Backups">3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { useServiceDetailStore } from '@/stores/service/serviceDetailStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const serviceDetailStore = useServiceDetailStore()
const { getService } = serviceDetailStore

const { loading, service } = storeToRefs(serviceDetailStore)
const route = useRoute()
const tabActive = ref(null)

const handleTabClick = (key) => {
  tabActive.value = key
}

onMounted(async () => {})

const convertToDayAndTime = (totalSeconds) => {
  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  return `${days} ngày, ${hours}:${minutes}:${seconds}`
}
</script>

<style scoped></style>
