import { defineStore } from 'pinia'
import { ref } from 'vue'
import InvoiceRepository from '@/repositories/InvoiceRepository'

export const usePaymentStore = defineStore('paymentStore', () => {
  const loading = ref(false)
  const paymentMethods = ref([])
  const paymentLink = ref('')
 
  async function getPaymentMethods() {
    loading.value = true
    const res = await InvoiceRepository.paymentMethod()
    paymentMethods.value = res.payments
    loading.value = false;
  }

  async function getPaymentLink(invoiceId, method) {
    loading.value = true
    const res = await InvoiceRepository.paymentLink(invoiceId, method)
    paymentLink.value = res.content.gateway
    loading.value = false;
  }


  return { loading, paymentMethods, paymentLink, getPaymentMethods, getPaymentLink }
})