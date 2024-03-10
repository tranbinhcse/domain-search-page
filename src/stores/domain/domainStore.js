import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import DomainRepository from '@/repositories/DomainRepository'

export const useDomainStore = defineStore('domainStore', () => {
  const loading = ref(false)
  const page = ref(1)
  const totalPages = ref(0)
  const domains = ref([])
  const filter = ref({
    status: 'Active'
  })

  async function getDomains() {
    const res = await DomainRepository.get({ page: page.value, perpage: 10, filter: filter.value })
    domains.value = res.domains
    page.value = res.page
    totalPages.value = res.totalPages
  }

  watch([page, filter], getDomains, {deep: true})
  
  return { loading, page, totalPages, domains, filter, getDomains }
})