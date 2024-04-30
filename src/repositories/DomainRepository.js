import { get, post } from '@/core/apiClient'
const DomainRepository = {
  find: async (domainId) => {
    const { details } = await get('/domain/' + domainId)
    details.reglog = details.reglog == '1'
    details.autorenew = details.autorenew == '1'
    details.idProtection = details.idProtection == '1'
    return details
  },
  get: async (options) => {
    const res = await get('domains', options)
    return {
      domains: res.domains,
      page: res.page.current,
      totalPages: res.page.total,
      records: res.page.records,
      perpage: res.page.perpage
    }
  },
  getDomainContact: async (domainId) => {
    const { contact_info } = await get(`domain/${domainId}/contact`)
    return contact_info.registrant
  },
  getTlds: async () => {
    const res = await get('cart/domain/tlds')
    return res.tlds
  },
  bulkSearch: async (options) => {
    const res = await post('domain/bulksearch', options)
    return res.domains
  },
  lookup: async (options) => {
    const res = await post('domain/lookup', options)
    return res
  },
  whois: async (domain) => {
    const res = await get(`whois/${domain}`)
    return res
  },
  getDNS: async (domainId) => {
    const res = await get(`domain/${domainId}/dns`)
    return res
  }
}

export default DomainRepository
