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
      </a-tabs>
    </div>

    <a-tabs size="large" hide-tab="true" position="bottom" :active-key="tabActive">
      <a-tab-pane key="Overview">
        <div
          class="flex gap-6 mb-5 justify-center items-center flex-auto"
          v-if="vmdetails.bandwidth"
        >
          <a-statistic
            title="Bandwidth Usage"
            :value="$unitFormat(vmdetails?.bandwidth?.data_sent)"
            show-group-separator
            class="bg-white p-6 rounded flex-auto"
            animation
          >
            <template #suffix> GB </template>
          </a-statistic>
          <a-statistic
            title="RAM Usage"
            :value="50.52"
            :precision="2"
            :value-style="{ color: '#0fbf60' }"
            class="bg-white p-6 rounded flex-auto"
          >
            <template #prefix>
              <icon-arrow-rise />
            </template>
            <template #suffix>%</template>
          </a-statistic>

          <div class="bg-white p-6 rounded flex-auto arco-statistic">
            <div class="arco-statistic-title">Uptime</div>
            <div class="arco-statistic-content">
              <div class="arco-statistic-value">
                <span class="arco-statistic-value-integer">{{
                  convertToDayAndTime(vmdetails?.uptime)
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded">
          <a-descriptions title="User Info" :column="{ xs: 1, md: 3, lg: 3 }">
            <a-descriptions-item span="1" label="Location">
              {{ service.server_name }}
            </a-descriptions-item>
            <a-descriptions-item span="1" label="vCPUs">
              {{ vmdetails.cpus }} vCPU
            </a-descriptions-item>
            <a-descriptions-item span="1" label="Label">
              {{ vmdetails.label }}
            </a-descriptions-item>

            <a-descriptions-item span="1" label="IP Address">
              {{ vmdetails.ipv4 }}
            </a-descriptions-item>

            <a-descriptions-item span="1" label="RAM">
              {{ vmdetails.memory }} MB
            </a-descriptions-item>
            <a-descriptions-item span="1" label="OS">
              {{ vmdetails.template_name }}
            </a-descriptions-item>
            <a-descriptions-item span="1" label="Username">
              {{ vmdetails.username }}
            </a-descriptions-item>
            <a-descriptions-item span="1" label="Storage">
              {{ vmdetails.disk }} GB
            </a-descriptions-item>
            <a-descriptions-item span="1" label="Bandwidth"> Unlimited </a-descriptions-item>
            <a-descriptions-item span="1" label="Password">
              {{ vmdetails.password }}
            </a-descriptions-item>

            <a-descriptions-item span="1" label="Expires">
              {{ service.expires }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </a-tab-pane>
      <a-tab-pane key="UsageGraphs" v-if="vmdetails.bandwidth">
        <div class="bg-white p-4 rounded">
          <h4>vCPU Usage</h4>
          <CpuChart :id="route.params.id" :vmid="vmid" :vmdetails="vmdetails" />
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
// import dayjs from 'dayjs'
import CpuChart from './CpuChart.vue'
import { useServiceDetailStore } from '@/stores/service/serviceDetailStore'
import { useProxmoxDetailStore } from '@/stores/service/modules/proxmoxDetailStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
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

const convertToDayAndTime = (totalSeconds) => {
  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  return `${days} ngày, ${hours}:${minutes}:${seconds}`
}
</script>

<style scoped></style>
