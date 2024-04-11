import { defineStore } from 'pinia'
import {  post } from '@/core/apiClient'
import { ref, watch,  } from 'vue'
import ProductRepository from '@/repositories/ProductRepository' 
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
    loading.value = true
    products.value = []
    selectedProduct.value = null
    product.value = null
    products.value = await ProductRepository.getProducts(category.value)
    loading.value = false
  }

  async function getProductConfiguration() {
  
    if (!selectedProduct.value) return

    loading.value = true
    product.value = await ProductRepository.getConfiguration(selectedProduct.value)
    loading.value = false
  }

//  async function getProductDomainOptions() {
//     if (!selectedProduct.value) return
//     // product.value = await ProductRepository.getDomainOptions(selectedProduct.value)
//   }

  
  async function order(router){
    loading.value = true
    // const res = await post(`/order/${selectedProduct.value}`, product.value)
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

  return { loading, error, category, products, selectedProduct, product, getProducts, order, removeDomainSelected, domainSelected }
})