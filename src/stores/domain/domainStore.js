import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import DomainRepository from '@/repositories/DomainRepository'

export const useDomainStore = defineStore('domainStore', () => {
  const loading = ref(false)
  const page = ref(0)
  const records = ref(0)
  const perpage = ref(10)
  const totalPages = ref(0)
  const domains = ref([])
  const filter = ref({
    status: ''
  })

  async function getDomains() {
    loading.value = true
    const res = await DomainRepository.get({ page: page.value, perpage: perpage.value, filter: filter.value })
    domains.value = res.domains
    page.value = res.page
    records.value = res.records
    perpage.value = res.perpage
    totalPages.value = res.totalPages
    loading.value = false
  }

  watch([page, perpage, filter], getDomains, {deep: true})
  
  return { loading, page, perpage, records, totalPages, domains, filter, getDomains }
})