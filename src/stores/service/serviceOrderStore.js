import { defineStore } from 'pinia'
import {  post } from '@/core/apiClient'
import { ref, watch, watchEffect } from 'vue'
import debounce from 'lodash/debounce';


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
    loading.value = false
    
  }

  async function getQuoteProduct() {
    if (!product.value) return
    loading.value = true
    quote.value = await CartRepository.getQuote([product.value])

    const filteredErrors = quote.value.items[0].error.filter(error => error.code === "coupon_not_exist" || error.code === 'coupon_not_applicable_1');

    error.value = filteredErrors[0]

    loading.value = false

  }
 
  
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


  const debouncedGetQuoteProduct = debounce(getQuoteProduct, 1000);



  watch(product, () => {
   debouncedGetQuoteProduct()
  }, { deep: true });
  

  return { loading, error, category, products, selectedProduct, cycle,  product, quote, domainSelected, getProducts, order, removeDomainSelected, getQuoteProduct, getProductConfiguration }
})