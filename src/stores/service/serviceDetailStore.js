import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import ServiceRepository from '@/repositories/ServiceRepository'

export const useServiceDetailStore = defineStore('serviceDetailStore', () => {
  const loading = ref(false)

  const service = ref([])
  const haveaddons = ref([])
  const addons = ref([])
  const unpaid_invoice = ref([])

  async function getService(id) {
    loading.value = true
    const res = await ServiceRepository.find(id)
    service.value = res.service
    addons.value = res.addons
    haveaddons.value = res.haveaddons
    unpaid_invoice.value = res.unpaid_invoice

    loading.value = false
  }

  //   watch([page, perpage, filter], getService, {deep: true})

  return { loading, service, getService }
})
