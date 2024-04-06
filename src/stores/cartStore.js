import { defineStore } from 'pinia'
import { get, post } from '@/core/apiClient'
import { reactive, ref, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import CartRepository from '@/repositories/CartRepository'
import ProductRepository from '@/repositories/ProductRepository'
import PaymentRepository from '@/repositories/PaymentRepository'
import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";
import { useDomainRegisterStore } from "@/stores/domain/domainRegisterStore";

export const useCartStore = defineStore('cartStore', () => {

  const loading = ref(false)
  const quoteLoading = ref(false)
  const hasDomain = ref(false)
  const requestEkyc = ref(false)
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
  
  
  async function getQuote() {
    requestEkyc.value = false;
    hasDomain.value = false;
    loading.value = true
    quoteLoading.value = true


    
    
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
        cartItems.value[index].period = quoteItems[index].domains[cartItems.value[index].name].period
        cartItems.value[index].years = quoteItems[index].domains[cartItems.value[index].name].period
        cartItems.value[index].price = quoteItems[index].domains[cartItems.value[index].name].price
        cartItems.value[index].recurring_price = quoteItems[index].domains[cartItems.value[index].name].recurring_price
        cartItems.value[index].setup = quoteItems[index].domains[cartItems.value[index].name].setup
        cartItems.value[index].nameservers = quoteItems[index].domains[cartItems.value[index].name].nameservers

        hasDomain.value = true
        if(quoteItems[index].domains[cartItems.value[index].name].tld == '.id.vn'){
          requestEkyc.value = true
        }
       }

       if( cartItems.value[index].type == 'product' && quoteItems[index].valid){
        cartItems.value[index].name = quoteItems[index].product.name
        cartItems.value[index].category_name = quoteItems[index].product.category_name
        cartItems.value[index].domain = quoteItems[index].product.domain
        cartItems.value[index].cycle = quoteItems[index].product.recurring
        cartItems.value[index].price = quoteItems[index].product.price_today
        cartItems.value[index].recurring_price = quoteItems[index].product.price
        cartItems.value[index].setup = quoteItems[index].product.setup
        cartItems.value[index].tax = quoteItems[index].product.tax
       }
       
    });

    saveToLocalStorage()
    loading.value = false
   console.log('cartItems', cartItems.value)

  }


  // async function updateItem(domain) { 
  
  //  // Check if the domain already exists in the domains array
  //   const index = cartItems.value.findIndex(existingDomain =>
  //     existingDomain.name === domain.name && existingDomain.tld === domain.tld
  //   );
     
  //   if (index !== -1) {
  //     cartItems.value[index] = { ...domain };
  //     saveToLocalStorage();
  //   }
    
  // }



  async function removeInCart(domain) {
    console.log(domain);
      // Filter out the domain from cartItems
    cartItems.value = cartItems.value.filter(
      (cartDomain) => !(cartDomain.name === domain.domain && cartDomain.tld === domain.tld)
    );
    
    cartItems.value = cartItems.value.filter(
      (cartDomain) => !(cartDomain.name === domain.name && cartDomain.tld === domain.tld)
    );

    const domainSearchStore = useDomainSearchStore()
    domainSearchStore.updateInCart(domain.domain, false);
    saveToLocalStorage();


  }

  async function addToCart(newItem) {
    loading.value = true
    
    // Check if the domain already exists in the domains array
    const exists = cartItems.value.some(existingDomain => 
      existingDomain.name === newItem.domain && existingDomain.tld === newItem.tld
    );
    
    // Modify this section to add domain data to the domains array
    if (!exists) {
      
      if(newItem.itemType == 'domain'){
        const domainData = {
          type: 'domain',
          name: newItem.domain,
          years: newItem.period ? newItem.period : '1',
          action: newItem.action,
          tld: newItem.tld,
          // ...newItem
        };
        cartItems.value.push(domainData);
        const domainSearchStore = useDomainSearchStore()
        domainSearchStore.updateInCart(domainData.name, true);
      } 

      if(newItem.itemType == 'product'){
        const productItem = {
          type: 'product',
          product_id: newItem.product_id,
          domain: newItem.domain,
          cycle: newItem.cycle,
          ...newItem
        };
        cartItems.value.push(productItem);
      }
    } 
   
    loading.value = false
    saveToLocalStorage();
  }

  async function updateItem(domain) {
    loading.value = true
  
   // Check if the domain already exists in the domains array
    const index = cartItems.value.findIndex(existingDomain =>
      existingDomain.name === domain.name && existingDomain.tld === domain.tld
    );
    console.log(domain);
    console.log(cartItems.value);
      console.log(index);
    if (index !== -1) {
      cartItems.value[index] = { ...domain };
      saveToLocalStorage();
    }
   
    loading.value = false
  }

  async function order(router){
    loading.value = true

    const domainRegisterStore = useDomainRegisterStore();
    const { contacts } = storeToRefs(domainRegisterStore)

    

    // Tạo một mảng mới để lưu đơn hàng với thông tin liên hệ (contacts) được thêm vào
    const updatedCartItems = [];

    // Lặp qua từng item trong cartItems
    for (const item of cartItems.value) {
        // Kiểm tra nếu item là loại 'domain'
        if (item.type === 'domain') {
            // Thêm thông tin liên hệ vào đơn hàng
            updatedCartItems.push({
                ...item,
                registrant: contacts.value.registrant,
                // admin: contacts.value.registrant,
                // tech: contacts.value.registrant,
                // billing: contacts.value.billing
            });
        } else {
            // Nếu loại sản phẩm không phải là 'domain', thì thêm item vào đơn hàng mà không thêm thông tin liên hệ
            updatedCartItems.push(item);
        }
    }

    // Gọi hàm order của CartRepository với đơn hàng đã được cập nhật
   const order = await CartRepository.order(updatedCartItems, 8, 3);
  
    if(!order.error){
      if(order.invoice_id != "0"){
        router.push({ name: 'invoiceDetails', params: { id: order.invoice_id } });
      }
    } 
    
    error.value = order.error    
    loading.value = false
  }


  return { getQuote, order, cartQuote,cartItems,  quoteLoading, clearCart, error , updateItem, removeInCart, addToCart, loading, hasDomain, requestEkyc }
})