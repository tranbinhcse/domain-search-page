import { get, post } from "@/core/apiClient"
const InvoiceRepository = {
  find: async invoiceId => {
    return await get('/invoice/'+invoiceId)
  
  },
  get: async options => {
    const res = await get('invoices', options)
    return {
      invoices: res.invoices,
      page: res.page.current,
      totalPages: res.page.total,
      records: res.page.records,
      perpage: res.page.perpage,
    }
  },
  paymentMethod: async () => {
    return await get('payment')
  },
  paymentLink: async (invoice_id, gateway_id) => {
    return await get('billing/'+ invoice_id +'/pay/' + gateway_id)
  }
 
}

export default InvoiceRepository