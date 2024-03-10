import { defineStore } from 'pinia'
import { ref } from 'vue'
import DomainRepository from '@/repositories/DomainRepository'

export const useDomainDetailStore = defineStore('domainDetailStore', () => {
  const loaded = ref(false)
  const domain = ref()
  const contact = ref()
 
  async function getDomain(domainId) {
    domain.value = await DomainRepository.find(domainId)
    contact.value = await DomainRepository.getDomainContact(domainId)
    loaded.value = true
  }

  return { loaded, domain, contact, getDomain }
})