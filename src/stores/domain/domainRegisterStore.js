import { defineStore } from 'pinia'
import { get } from '@/core/apiClient'
import { reactive, ref, watch, onMounted } from 'vue'

import { useDomainSearchStore } from "@/stores/domain/domainSearchStore";

export const useDomainRegisterStore = defineStore('domainRegisterStore', () => {
  const loading = ref(false)
  const cartDomains = ref([])


  // Load cartDomains from localStorage on component mount
  onMounted(() => {
    const storedCartDomains = localStorage.getItem('cartDomains');
    if (storedCartDomains) {
      cartDomains.value = JSON.parse(storedCartDomains);
    }
  });

  const saveToLocalStorage = () => {
    localStorage.setItem('cartDomains', JSON.stringify(cartDomains.value));
  };

  async function removeInCart(domain) {
 
    // Filter out the domain from cartDomains
  cartDomains.value = cartDomains.value.filter(
    (cartDomain) => !(cartDomain.name === domain.domain && cartDomain.tld === domain.tld)
  );

  const domainSearchStore = useDomainSearchStore()
  domainSearchStore.updateInCart(domain.domain, false);
  saveToLocalStorage();


  }

  async function addToCart(domain) {
    loading.value = true
    // add data to domains

    // Check if the domain already exists in the domains array
    const exists = cartDomains.value.some(existingDomain => 
      existingDomain.name === domain.domain && existingDomain.tld === domain.tld
    );

    
    // Modify this section to add domain data to the domains array
    if (!exists) {
      const domainData = {
        name: domain.domain,
        years: domain.period,
        action: domain.type,
        tld: domain.tld
      };
      cartDomains.value.push(domainData);

      const domainSearchStore = useDomainSearchStore()
      domainSearchStore.updateInCart(domainData.name, true);
      saveToLocalStorage();
    };

   

   
    
    loading.value = false
 
  }

  return { loading, cartDomains, addToCart, removeInCart }
})