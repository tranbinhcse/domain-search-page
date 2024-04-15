import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import ServiceRepository from '@/repositories/ServiceRepository'
import ProxmoxRepository from '@/repositories/ProxmoxRepository'

export const useProxmoxDetailStore = defineStore('proxmoxDetailStore', () => {
  const loading = ref(false)
 
  const vmid = ref(null)
  const vms = ref(null)
  const vmdetails = ref([])
  const resources = ref([])
  const usage = ref([])
  const haveaddons = ref([])
  const addons = ref([])
  const unpaid_invoice = ref([])
 

  async function list(id) {
    loading.value = true
    const res = await ProxmoxRepository.list(id)
    vms.value = res.vms
    loading.value = false
    if(Object.keys(res.vms).length === 1){
        vmid.value =  Object.keys(res.vms)[0]
    }
  }
  
  async function getVMDetails(id, vmid) {
    loading.value = true
    const res = await ProxmoxRepository.find(id, vmid)
    vmdetails.value = res.vm
    loading.value = false
  }  
  async function getResources(id) {
    loading.value = true
    const res = await ProxmoxRepository.resources(id)
    resources.value = res
    loading.value = false
  }
  async function getUsage(id, vmid) {
    loading.value = true
    const res = await ProxmoxRepository.usage(id, vmid)
    usage.value = res
    loading.value = false
  }
//   watch([page, perpage, filter], getService, {deep: true})
  
  return { loading, vmid, getVMDetails, list, vmdetails, resources, getResources, usage, getUsage}
})