<template>
  <VCharts
    v-if="renderChart"
    :option="options"
    :autoresize="autoResize"
    :style="{ width, height }"
  />
</template>

<script>
import { ref, nextTick } from 'vue'
import VCharts from 'vue-echarts'

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  setup() {
    const renderChart = ref(false)
    nextTick(() => {
      renderChart.value = true
    })
    return { renderChart }
  },
  components: {
    VCharts
  }
}
</script>

<style scoped></style>
