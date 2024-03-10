import { defineStore } from 'pinia'
import { get, post } from '@/core/apiClient'
import { reactive, ref, watch, onMounted } from 'vue'
import CartRepository from '@/repositories/CartRepository'
import ProductRepository from '@/repositories/ProductRepository'
import PaymentRepository from '@/repositories/PaymentRepository'

export const useCartStore = defineStore('cartStore', () => {

  const quoteLoading = ref(false)
//   const category = ref()
//   const products = ref([])
//   const selectedProduct = ref()
//   const paymentMethods = ref([])
//   const paymentMethod = ref()
//   const product = ref()

  const cartItems = ref([]) 
  const cartQuote = ref()

  onMounted(() => {
    const storedcartItems= localStorage.getItem('cartItems');
    if (storedcartItems) {
        cartItems.value = JSON.parse(storedcartItems);
    }
  });

  async function getQuote() {
     
    quoteLoading.value = true
    const storedcartItems= localStorage.getItem('cartItems');
    if (storedcartItems) {
        cartItems.value = JSON.parse(storedcartItems);
    }
    cartQuote.value = await CartRepository.getQuote(cartItems.value)
    quoteLoading.value = false
  }

//   async function getProductConfiguration() {
//     if (!selectedProduct.value) return
//     product.value = await ProductRepository.getConfiguration(selectedProduct.value)
//   }

//   async function getPaymentMethods() {
//     const payments = await PaymentRepository.getPaymentMethods()
//     paymentMethods.value = payments
//     paymentMethod.value = Object.keys(payments)[0]
//   }

//   async function order(){
//     const res = await post(`/order/${selectedProduct.value}`, product.value)
    
//     // await get(`/billing/${res.invoice_id}/pay/${paymentMethod.value}`)
//   }

//   watch(category, getProducts)
//   watch(selectedProduct, () => {
//     getProductConfiguration()
//     getPaymentMethods()
//   })

  return { getQuote, cartQuote, quoteLoading }
})