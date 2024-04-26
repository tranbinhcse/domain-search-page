import { defineStore } from 'pinia'
import { ref } from 'vue'
import InvoiceRepository from '@/repositories/InvoiceRepository'

export const useInvoiceDetailStore = defineStore('invoiceDetailStore', () => {
  const loading = ref(false)
  const invoice = ref([])
  const invoiceBody = ref('')
  const transactions = ref([])
  const cancancelinvoice = ref(false)
  const paymentMethod = ref('')

  async function getInvoice(invoiceId) {
    loading.value = true
    const res = await InvoiceRepository.find(invoiceId)
    invoice.value = res.invoice
    invoiceBody.value = res.invoicebody
    transactions.value = res.transactions
    cancancelinvoice.value = res.cancancelinvoice
    paymentMethod.value = res.invoice.payment_module
    loading.value = false
  }

  return {
    loading,
    invoice,
    invoiceBody,
    paymentMethod,
    transactions,
    cancancelinvoice,
    getInvoice
  }
})
