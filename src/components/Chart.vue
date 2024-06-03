<template>
  <v-chart :option="options" :autoresize="autoResize" :style="{ width, height }" />
</template>

<script setup>
import { ref, nextTick, defineProps } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

defineProps(['options', 'width', 'height', 'autoResize'])

use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent])
const renderChart = ref(false)
nextTick(() => {
  renderChart.value = true
})
</script>

<style scoped></style>
