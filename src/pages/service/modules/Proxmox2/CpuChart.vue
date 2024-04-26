<template>
  {{ vmid }}
  <!-- <Chart height="289px" :option="chartOption" /> -->
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

onMounted(() => {
  getUsage(props.id, props.vmid)
})

const { chartOption } = useChartOption(() => {
  return {
    grid: {
      left: '2.6%',
      right: '0',
      top: '10',
      bottom: '30'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  }
})
</script>
