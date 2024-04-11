import { get } from "@/core/apiClient"
const ServiceRepository = {
  find: async id => {
    const reps = await get('/service/'+id)
    return reps
  },
  get: async (slug, options) => {
    const res = await get('services/' + slug, options)
    return {
      services: res.services,
      page: res.page.current,
      totalPages: res.page.total,
      records: res.page.records,
      perpage: res.page.perpage,
    }
  },
  getSubCategories: async (slug) => {
    const res = await get('categories/')
    return res;
  }
 
}

export default ServiceRepository