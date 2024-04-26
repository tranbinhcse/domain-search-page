import { defineStore } from 'pinia'
import { get } from '@/core/apiClient'
import { reactive, ref, watch, onMounted } from 'vue'
import DomainRepository from '@/repositories/DomainRepository'

export const useDashboardStore = defineStore('dashboardStore', () => {
  const loading = ref(false)
  const domains = ref([])
  const totalDomains = ref()

  async function getDashboard() {
    const res = await DomainRepository.get({ page: 1, perpage: 10 })
    domains.value = res.domains
    totalDomains.value = res.total
  }

  return { loading, domains, totalDomains, getDashboard }
})
