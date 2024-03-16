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
  const error = ref()
  const cartItems = ref([]) 
  const cartQuote = ref()

  onMounted(() => {
    const storedcartItems= localStorage.getItem('cartItems');
    if (storedcartItems) {
        cartItems.value = JSON.parse(storedcartItems);
    }
  });

  const saveToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  };

  async function clearCart(){
    cartItems.value = [];
    saveToLocalStorage()
    getQuote()
  }
  // async function removeInCart(product){
  //   cartItems.value = cartItems.value.filter(
  //     (cartProduct) => !(cartProduct.product_id === product.product_id)
  //   );
  //   saveToLocalStorage()
  // }
  async function getQuote() {
     
    quoteLoading.value = true
    const storedcartItems= localStorage.getItem('cartItems');
    if (storedcartItems) {
        cartItems.value = JSON.parse(storedcartItems);
    }
    cartQuote.value = await CartRepository.getQuote(cartItems.value)
    quoteLoading.value = false



    const quoteItems = cartQuote.value.items
 
     const invalidIndexes = quoteItems.reduce((acc, item, index) => {
          acc.push(index);
          return acc;
      }, []);
   
      invalidIndexes.forEach(index => {
     
        cartItems.value[index].error = quoteItems[index].error
        cartItems.value[index].coupon = quoteItems[index].coupon
        cartItems.value[index].info = quoteItems[index].info
        cartItems.value[index].valid = quoteItems[index].valid

       if( cartItems.value[index].type == 'domain' && quoteItems[index].valid){
        cartItems.value[index].years = quoteItems[index].domains[cartItems.value[index].name].period
        cartItems.value[index].price = quoteItems[index].domains[cartItems.value[index].name].price
        cartItems.value[index].recurring_price = quoteItems[index].domains[cartItems.value[index].name].recurring_price
        cartItems.value[index].setup = quoteItems[index].domains[cartItems.value[index].name].setup
        cartItems.value[index].nameservers = quoteItems[index].domains[cartItems.value[index].name].nameservers
       }


        saveToLocalStorage()
    });

   


  }


  async function updateItem(domain) { 
  
   // Check if the domain already exists in the domains array
    const index = cartItems.value.findIndex(existingDomain =>
      existingDomain.name === domain.name && existingDomain.tld === domain.tld
    );
     
    if (index !== -1) {
      cartItems.value[index] = { ...domain };
      saveToLocalStorage();
    }
    
  }

  return { getQuote, cartQuote,cartItems,  quoteLoading, clearCart, error , updateItem}
})