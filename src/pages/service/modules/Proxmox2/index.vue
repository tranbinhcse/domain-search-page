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
          <a-tooltip content="View console">
            <a-button type="icon"><icon-code-square size="26" class="text-gray-400" /></a-button>
          </a-tooltip>
          <a-tooltip content="Server Stop">
            <a-button type="icon"><icon-poweroff size="26" class="text-gray-400" /></a-button>
          </a-tooltip>
          <a-tooltip content="Server Restart">
            <a-button type="icon"><icon-sync size="26" class="text-gray-400" /></a-button>
          </a-tooltip>
          <a-tooltip content="Server Rebuild">
            <a-button type="icon"><icon-swap size="26" class="text-gray-400" /></a-button>
          </a-tooltip>
        </template>
      </a-page-header>
      <a-tabs size="large" @change="handleTabClick" hide-content="true">
        <a-tab-pane key="Overview">
          <template #title> <icon-calendar /> Overview </template>
        </a-tab-pane>
        <a-tab-pane key="UsageGraphs">
          <template #title> Usage Graphs </template>
        </a-tab-pane>
        <a-tab-pane key="Settings">
          <template #title> Settings </template>
        </a-tab-pane>
        <a-tab-pane key="Snapshots">
          <template #title> Snapshots </template>
        </a-tab-pane>
        <a-tab-pane key="Backups">
          <template #title> Backups </template>
        </a-tab-pane>
      </a-tabs>
    </div>

    <a-tabs size="large" hide-tab="true" position="bottom" :active-key="tabActive">
      <a-tab-pane key="Overview">
        <OverView :service="service" :vmdetails="vmdetails" />
      </a-tab-pane>
      <a-tab-pane key="UsageGraphs" v-if="vmdetails.bandwidth">
        <div class="bg-white p-4 rounded">
          <h4>Monthly Bandwidth</h4>
          <BandwidthChart :id="route.params.id" :vmid="vmid" :vmdetails="vmdetails" />
        </div>
        <div class="bg-white p-4 rounded">
          <h4>vCPU Usage</h4>
          <CpuChart :id="route.params.id" :vmid="vmid" :vmdetails="vmdetails" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="Settings">
        <Setting />
      </a-tab-pane>
      <a-tab-pane key="Snapshots">
        <Snapshots />
      </a-tab-pane>
      <a-tab-pane key="Backups">
        <Backups />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import dayjs from 'dayjs'
import CpuChart from './CpuChart.vue'
import { useServiceDetailStore } from '@/stores/service/serviceDetailStore'
import { useProxmoxDetailStore } from '@/stores/service/modules/proxmoxDetailStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import OverView from '@/components/serviceDetail/OverView.vue'
import Setting from '@/components/serviceDetail/Setting.vue'
import Snapshots from '@/components/serviceDetail/Snapshots.vue'
import Backups from '@/components/serviceDetail/Backups.vue'
import BandwidthChart from './BandwidthChart.vue'
const serviceDetailStore = useServiceDetailStore()
const proxmoxDetailStore = useProxmoxDetailStore()
const { getService } = serviceDetailStore
const { list, getVMDetails } = proxmoxDetailStore
const { loading, service } = storeToRefs(serviceDetailStore)
const { vms, vmid, vmdetails } = storeToRefs(proxmoxDetailStore)
const route = useRoute()
const tabActive = ref(null)

const handleTabClick = (key) => {
  tabActive.value = key
}

onMounted(async () => {
  await list(route.params.id)
  await getVMDetails(route.params.id, vmid.value)
})
</script>

<style scoped></style>
