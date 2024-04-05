import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import ServiceRepository from '@/repositories/ServiceRepository'

export const useServiceStore = defineStore('serviceStore', () => {
  const loading = ref(false)
  const slug = ref(0)
  const page = ref(0)
  const records = ref(0)
  const perpage = ref(10)
  const totalPages = ref(0)
  const services = ref([])
  const filter = ref({
    status: ''
  })

  async function getServices() {
    loading.value = true
    const res = await ServiceRepository.get(slug.value, { page: page.value, perpage: perpage.value, filter: filter.value })
    services.value = res.services
    page.value = res.page
    records.value = res.records
    perpage.value = res.perpage
    totalPages.value = res.totalPages
    loading.value = false
  }

  watch([page, perpage, filter], getServices, {deep: true})
  
  return { loading, page, perpage, records, totalPages, services, filter, getServices , slug}
})