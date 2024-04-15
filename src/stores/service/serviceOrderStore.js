import { defineStore } from 'pinia'
import {  post } from '@/core/apiClient'
import { ref, watch, watchEffect } from 'vue'
import ProductRepository from '@/repositories/ProductRepository' 
import CartRepository from '@/repositories/CartRepository' 
import { useCartStore } from "@/stores/cartStore";

export const useServiceOrderStore = defineStore('serviceOrderStore', () => {
  const loading = ref(false)
  const error = ref()
  const category = ref()
  const quote = ref([])
  const products = ref([])
  const selectedProduct = ref()
  const cycle = ref('a')
  const product = ref()
  const domainSelected = ref()

  async function getProducts() {
   
    if (!category.value) return
    loading.value = true
    products.value = []
    selectedProduct.value = null
    cycle.value = 'a'
    product.value = null
    products.value = await ProductRepository.getProducts(category.value)
    loading.value = false
  }

  async function getProductConfiguration() {
  
    if (!selectedProduct.value) return
 
    loading.value = true
    product.value = await ProductRepository.getConfiguration(selectedProduct.value, cycle.value)
    // quote.value = await CartRepository.getQuote([product.value])
    loading.value = false
    
  }

  async function getQuoteProduct() {
    quote.value = await CartRepository.getQuote([product.value])
  }

//  async function getProductDomainOptions() {
//     if (!selectedProduct.value) return
//     // product.value = await ProductRepository.getDomainOptions(selectedProduct.value)
//   }

  
  async function order(router){
    loading.value = true
    const cartStore = useCartStore()
    product.value.itemType = 'product'
    cartStore.addToCart(product.value)
    router.push({ path: '/cart/checkout' })
    loading.value = false
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
  })
 
   // Theo dõi sự thay đổi của product và gọi getQuoteProduct
   watch(product, () => {
    
    getQuoteProduct()
  }, { deep: true })

  return { loading, error, category, products, selectedProduct, cycle,  product, quote, domainSelected, getProducts, order, removeDomainSelected, getQuoteProduct, getProductConfiguration }
})