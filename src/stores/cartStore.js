import { defineStore } from 'pinia' 
import {  ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import CartRepository from '@/repositories/CartRepository'
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
  const paymentMethods = ref([])
  const paymentMethod = ref()

  onMounted(() => {
    const storedcartItems= localStorage.getItem('cartItems');
    if (storedcartItems) {
        cartItems.value = JSON.parse(storedcartItems);
    }
  });



  async function getPaymentMethods() {
    const payments = await PaymentRepository.getPaymentMethods()
    paymentMethods.value = payments
    paymentMethod.value = Object.keys(payments)[0]
  }



  const saveToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  };

  async function clearCart(){
    const domainRegisterStore = useDomainRegisterStore()
    const { freeVN, confirmContact } = storeToRefs(domainRegisterStore)
    cartItems.value = [];
    saveToLocalStorage()

    freeVN.value = []
    confirmContact.value = false
    
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
        cartItems.value[index].tld = quoteItems[index].domains[cartItems.value[index].name].tld
        // cartItems.value[index].config = quoteItems[index].domains[cartItems.value[index].name].config

        hasDomain.value = true
        if(quoteItems[index].domains[cartItems.value[index].name].tld == '.id.vn'){
          requestEkyc.value = true
        }


        const cycles = computed(() => {
          return quoteItems[index].domains[cartItems.value[index]?.name]?.config?.product.find(field => field.id === 'period');
        });

        cartItems.value[index].cycles = cycles


       }

       if( cartItems.value[index].type == 'product' && quoteItems[index].valid){
        cartItems.value[index].name = quoteItems[index].product.name
        cartItems.value[index].category_name = quoteItems[index].product.category_name
        // if(quoteItems[index].product.domain){
        //   cartItems.value[index].domain = quoteItems[index].product.domain
        // }
     
        cartItems.value[index].cycle = quoteItems[index].product.recurring
        cartItems.value[index].price = quoteItems[index].product.price_today
        cartItems.value[index].recurring_price = quoteItems[index].product.price
        cartItems.value[index].setup = quoteItems[index].product.setup
        cartItems.value[index].tax = quoteItems[index].product.tax
       }
       
    });

    saveToLocalStorage()
    loading.value = false
  

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
    console.log('newItem',newItem);
    if(newItem.itemType == 'domain'){
      const exists = cartItems.value.some(existingDomain => 
        existingDomain.name === newItem.domain && existingDomain.tld === newItem.tld
      );
      if (!exists) {
        const domainData = {
          type: 'domain',
          name: newItem.domain,
          years: newItem.period ? newItem.period : '1',
          action: newItem.action ?? newItem.type,
          tld: newItem.tld,
          // ...newItem
        };
        cartItems.value.push(domainData);
        const domainSearchStore = useDomainSearchStore()
        domainSearchStore.updateInCart(domainData.name, true);
      }
    }
    if(newItem.itemType == 'product'){

      const exists = cartItems.value.some(existingProduct => 
        existingProduct.product_id === newItem.product_id && existingProduct.domain === newItem.domain
      );
      if (!exists) {
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
    
    // Modify this section to add domain data to the domains array
    // if (!exists) {
      
    //   if(newItem.itemType == 'domain'){
    //     const domainData = {
    //       type: 'domain',
    //       name: newItem.domain,
    //       years: newItem.period ? newItem.period : '1',
    //       action: newItem.action,
    //       tld: newItem.tld,
    //       // ...newItem
    //     };
    //     cartItems.value.push(domainData);
    //     const domainSearchStore = useDomainSearchStore()
    //     domainSearchStore.updateInCart(domainData.name, true);
    //   } 

    //   if(newItem.itemType == 'product'){
    //     const productItem = {
    //       type: 'product',
    //       product_id: newItem.product_id,
    //       domain: newItem.domain,
    //       cycle: newItem.cycle,
    //       ...newItem
    //     };
    //     cartItems.value.push(productItem);
    //   }
    // } 
   
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

  async function getFreePromocode() {

    const domainRegisterStore = useDomainRegisterStore();
    const { contacts } = storeToRefs(domainRegisterStore)
    const options = {
      idnumber: contacts.value.registrant.nationalid,
      domain: 'example.com'
    }
    await CartRepository.getFreePromocode(options);
  }

  async function order(router){
    loading.value = true

    const domainRegisterStore = useDomainRegisterStore();
    const { contacts, freeVN } = storeToRefs(domainRegisterStore)

    

    // Tạo một mảng mới để lưu đơn hàng với thông tin liên hệ (contacts) được thêm vào
    const updatedCartItems = [];

    // Lặp qua từng item trong cartItems
    for (const item of cartItems.value) {
        // Kiểm tra nếu item là loại 'domain'
        if (item.type === 'domain') {

          if(freeVN.value.data?.promotionCode && freeVN.value.data?.domainName == item.name){


            if (!item.data) {
              item.data = {}; // Tạo một đối tượng data mới nếu không tồn tại
            }

            // updatedCartItems.push({
            //   ...item,
            //   data.promocode: freeVN.value.data.promotionCode
            // });
            item.data.promocode = freeVN.value.data.promotionCode
          }

          if(item.error){
            delete item.error
            delete item.info
            delete item.setup
            delete item.recurring_price
          }
            // Thêm thông tin liên hệ vào đơn hàng
            updatedCartItems.push({
                ...item,
                nameservers: [
                  'ns1.tino.vn',
                  'ns2.tino.vn'
                ],
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
   const order = await CartRepository.order(updatedCartItems, 1, 1);
  
    if(!order.error){
      clearCart();
      if(order.invoice_id != "0"){
        router.push({ name: 'invoiceDetails', params: { id: order.invoice_id } });
       
      } else {
        router.push({ name: 'WebsiteManage'});
      }
     
    } 
    
    error.value = order.error    
    loading.value = false
  }


  return { getQuote, order, cartQuote,cartItems,  quoteLoading, clearCart, error , updateItem, removeInCart, addToCart, loading, hasDomain, requestEkyc, getFreePromocode, saveToLocalStorage, getPaymentMethods, paymentMethods, paymentMethod }
})