<template>
  <div>
    <component :is="currentModule" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import DefaultModule from '@/pages/service/modules/Default/index.vue'

import { useServiceDetailStore } from '@/stores/service/serviceDetailStore'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const serviceDetailStore = useServiceDetailStore()
const { getService } = serviceDetailStore
const { loading, service } = storeToRefs(serviceDetailStore)

const route = useRoute()
const currentModule = ref(null)

onMounted(async () => {
  await getService(route.params.id)
  const moduleName = service.value.acc_module
  let module = null
  // Dynamic import based on moduleName
  try {
    const module = await import(`@/pages/service/modules/${moduleName}/index.vue`)
    currentModule.value = module.default
  } catch (error) {
    currentModule.value = DefaultModule
  }
})
</script>

<style scoped></style>
