import { get } from "@/core/apiClient"
const ProxmoxRepository = {
  list: async (id) => {
    const reps = await get('/service/'+id+'/vms')
    return reps
  }, 
  find: async (id, vmid) => {
    const reps = await get('/service/'+id+'/vms/'+vmid)
    return reps
  },
  resources: async (id) => {
    const reps = await get('/service/'+id+'/resources')
    return reps
  }, 
  usage: async (id, vmid) => {
    const reps = await get('/service/'+id+'/vms/'+vmid+'/usage')
    return reps
  },
}

export default ProxmoxRepository