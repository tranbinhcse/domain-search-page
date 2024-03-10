import { defineStore } from 'pinia'
import { get } from '@/core/apiClient'
import { reactive, ref, watch, onMounted } from 'vue'

import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";

export const useDomainRegisterStore = defineStore('domainRegisterStore', () => {
  const loading = ref(false)
  const cartItems = ref([])


  // Load cartItems from localStorage on component mount
  onMounted(() => {
    const storedcartItems = localStorage.getItem('cartItems');
    if (storedcartItems) {
      cartItems.value = JSON.parse(storedcartItems);
    }
  });

  const saveToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
  };

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

  async function addToCart(domain) {
    loading.value = true
    // add data to domains

    // Check if the domain already exists in the domains array
    const exists = cartItems.value.some(existingDomain => 
      existingDomain.name === domain.domain && existingDomain.tld === domain.tld
    );

    
    // Modify this section to add domain data to the domains array
    if (!exists) {
      const domainData = {
        type: 'domain',
        name: domain.domain,
        years: domain.period,
        action: domain.type,
        tld: domain.tld
      };
      cartItems.value.push(domainData);

      const domainSearchStore = useDomainSearchStore()
      domainSearchStore.updateInCart(domainData.name, true);
      saveToLocalStorage();
    };

   

   
    
    loading.value = false
 
  }

  return { loading, cartItems, addToCart, removeInCart }
})