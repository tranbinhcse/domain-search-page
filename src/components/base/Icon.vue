<template>
  <span>
    <Icon :icon="icon" :inline="true" :style="{ color: color, fontSize: fontSize }" />
  </span>
</template>
<script>
import { Icon } from '@iconify/vue'
export default {
  components: {
    Icon
  },
  props: {
    icon: 'heroicons-outline:home',
    color: 'blue',
    fontSize: '16px'
  }
}
</script>
<style lang=""></style>
