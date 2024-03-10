import { defineStore } from 'pinia'
import { get, post } from '@/core/apiClient'
import { reactive, ref, watch, onMounted } from 'vue'
import ProductRepository from '@/repositories/ProductRepository'
import PaymentRepository from '@/repositories/PaymentRepository'

export const useServiceOrderStore = defineStore('serviceOrderStore', () => {
  const loading = ref(false)
  const category = ref()
  const products = ref([])
  const selectedProduct = ref()
  const paymentMethods = ref([])
  const paymentMethod = ref()
  const product = ref()

  async function getProducts() {
    if (!category.value) return
    products.value = []
    selectedProduct.value = null
    product.value = null
    products.value = await ProductRepository.getProducts(category.value)
  }

  async function getProductConfiguration() {
    if (!selectedProduct.value) return
    product.value = await ProductRepository.getConfiguration(selectedProduct.value)
  }

  async function getPaymentMethods() {
    const payments = await PaymentRepository.getPaymentMethods()
    paymentMethods.value = payments
    paymentMethod.value = Object.keys(payments)[0]
  }

  async function order(){
    const res = await post(`/order/${selectedProduct.value}`, product.value)
    
    // await get(`/billing/${res.invoice_id}/pay/${paymentMethod.value}`)
  }

  watch(category, getProducts)
  watch(selectedProduct, () => {
    getProductConfiguration()
    getPaymentMethods()
  })

  return { loading, category, products, selectedProduct, product, paymentMethods, paymentMethod, getProducts, order }
})