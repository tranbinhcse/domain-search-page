import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import InvoiceRepository from '@/repositories/InvoiceRepository'

export const useInvoiceStore = defineStore('invoiceStore', () => {
  const loading = ref(false)
  const page = ref(0)
  const records = ref(0)
  const perpage = ref(10)
  const totalPages = ref(0)
  const invoices = ref([])
  const filter = ref({
    status: ''
  })

  async function getInvoices() {
    loading.value = true
    const res = await InvoiceRepository.get({
      page: page.value,
      perpage: perpage.value,
      filter: filter.value
    })
    invoices.value = res.invoices
    page.value = res.page
    records.value = res.records
    perpage.value = res.perpage
    totalPages.value = res.totalPages
    loading.value = false
  }

  watch([page, perpage, filter], getInvoices, { deep: true })

  return { loading, page, perpage, records, totalPages, invoices, filter, getInvoices }
})
