import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue' 

export const useDomainRegisterStore = defineStore({
  id: 'domainRegisterStore',
  state: () => ({
    loading: false,
    contacts: [],
    errorContact: false
  }),
  actions: {
    
    saveContacts(data) {
      this.contacts = data 
    },
 
  },
  persist: {
    paths: [ 'contacts']
  }
})
