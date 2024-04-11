import { defineStore } from 'pinia'
import {  post } from '@/core/apiClient'
import { ref, watch,  } from 'vue'
import ProductRepository from '@/repositories/ProductRepository'
import PaymentRepository from '@/repositories/PaymentRepository'
import { useCartStore } from "@/stores/cartStore";

export const useServiceOrderStore = defineStore('serviceOrderStore', () => {
  const loading = ref(false)
  const error = ref()
  const category = ref()
  const products = ref([])
  const selectedProduct = ref()

  const product = ref()
  const domainSelected = ref()

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

//  async function getProductDomainOptions() {
//     if (!selectedProduct.value) return
//     // product.value = await ProductRepository.getDomainOptions(selectedProduct.value)
//   }

  
  async function order(router){
    
    // const res = await post(`/order/${selectedProduct.value}`, product.value)
    const cartStore = useCartStore()
    product.value.itemType = 'product'
    cartStore.addToCart(product.value)
    router.push({ path: '/cart/checkout' })
  }

  async function removeDomainSelected(domain) {
    product.value.domain = null
    domainSelected.value = []
    const cartStore = useCartStore()
    cartStore.removeInCart(domain)
  }

  watch(category, getProducts)
  watch(selectedProduct, () => {
    getProductConfiguration()
    getPaymentMethods()
  })

  return { loading, error, category, products, selectedProduct, product, getProducts, order, removeDomainSelected, domainSelected }
})