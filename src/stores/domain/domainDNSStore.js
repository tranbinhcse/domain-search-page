import { defineStore } from 'pinia'
import { ref } from 'vue'
import DomainRepository from '@/repositories/DomainRepository'

export const useDomainDNSStore = defineStore('domainDNSStore', () => {
  const loaded = ref(false)
  const loading = ref(false)
  const records = ref([]) 
  const domain = ref() 

  async function getDNS(domainId) {
    loading.value = true
    const resp = await DomainRepository.getDNS(domainId) 
    records.value = resp.records
    domain.value = resp.name
    loaded.value = true
    loading.value = false
  }

  return { loaded, records, domain, loading, getDNS }
})
