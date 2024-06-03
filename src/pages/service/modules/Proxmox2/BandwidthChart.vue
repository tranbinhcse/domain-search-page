<template>
  <div class="p-4">
    <div>
      <p class="mb-2">
        Usage: <a-link>{{ usage }} GB ({{ percentage }}%)</a-link>
      </p>
      <p class="mb-2">Inbound: {{ inbound }} GB</p>
      <p class="mb-2">Outbound: {{ outbound }} GB</p>
      <Chart height="289px" :option="chartOption" />
      <!-- <v-chart :options="chartOptions" class="w-full h-64"></v-chart> -->
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
// import dayjs from 'dayjs'
import Chart from '@/components/Chart.vue'
import useChartOption from '@/hooks/chart-option'

import { useProxmoxDetailStore } from '@/stores/service/modules/proxmoxDetailStore'

const proxmoxDetailStore = useProxmoxDetailStore()
const { getUsage } = proxmoxDetailStore
const { usage } = storeToRefs(proxmoxDetailStore)

const props = defineProps(['vmid', 'vmdetails', 'id'])

const percentage = 20
const inbound = 21.6
const outbound = 446.94

onMounted(() => {
  getUsage(props.id, props.vmid)
})

const { chartOption } = useChartOption(() => {
  return {
    tooltip: {},
    xAxis: {
      type: 'category',
      data: [
        'Apr 23',
        'Apr 26',
        'Apr 29',
        'May 02',
        'May 05',
        'May 08',
        'May 11',
        'May 14',
        'May 17',
        'May 20'
      ]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Bytes received',
        type: 'bar',
        data: [23.28, 46.57, 69.85, 23.28, 46.57, 23.28, 46.57, 23.28, 46.57, 23.28],
        stack: 'total',
        itemStyle: {
          color: '#5470C6'
        }
      },
      {
        name: 'Bytes sent',
        type: 'bar',
        data: [46.57, 69.85, 93.13, 69.85, 93.13, 69.85, 93.13, 69.85, 93.13, 69.85],
        stack: 'total',
        itemStyle: {
          color: '#91CC75'
        }
      }
    ]
  }
})
</script>
