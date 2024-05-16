import { defineStore } from 'pinia'
import { ref } from 'vue'
import DomainRepository from '@/repositories/DomainRepository'

export const useDomainDNSStore = defineStore('domainDNSStore', () => {
  const loaded = ref(false)
  const loading = ref(false)
  const records = ref([]) 
  const domain = ref() 
  const serviceId = ref('')
  const zoneId = ref('')
  const listType = ref([])
  const maxTTL = ref(0)

  async function getDNS(domainId) {
    loading.value = true
    const resp = await DomainRepository.getDNS(domainId) 
    records.value = resp.records
    domain.value = resp.name
    serviceId.value = resp.service_id
    zoneId.value = resp.zone_id
    listType.value = resp.available_type
    maxTTL.value = parseFloat(resp.nsttl)
    loaded.value = true
    loading.value = false
  }

  async function createDNS(serviceId, zoneId, body) {
    const res = await DomainRepository.createDNS(serviceId, zoneId, body)
    records.value.unshift(res.record)
    return res
  }

  async function editDNS(recordId, serviceId, zoneId, body) {
    const res = await DomainRepository.editDNS(recordId, serviceId, zoneId, body)
    const recordIndex = records.value.findIndex(record => record.id === recordId)
    records.value[recordIndex] = res.record 
    return res
  }

  async function deleteDNS(recordId, serviceId, zoneId, body) {
    const res = await DomainRepository.deleteDNS(recordId, serviceId, zoneId, body)
    const recordIndex = records.value.findIndex(record => record.id === recordId)
    records.value.splice(recordIndex, 1)
    return res
  }

  return { loaded, records, domain, loading, serviceId, zoneId, listType, maxTTL, getDNS, createDNS, editDNS, deleteDNS }
})
