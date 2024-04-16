import { defineStore } from 'pinia'
import {  ref, watch} from 'vue'
import WebsiteRepository from '@/repositories/WebsiteRepository'
import { useCartStore } from "@/stores/cartStore";


export const useWebStore = defineStore('webStore', {

    
  state: () => {
    return {
      loading: false,
      error: false,
      domain: '',
      themes: ref([]), 
      page: ref(0),
      records: ref(0),
      perpage: ref(10),
      totalPages: ref(0),
      filter: ref({}),
      themeSelected: {
        "type": "register"
      },
      cartItems: [],
    }
  },
  actions: {
     

    async getThemes(){
      this.loading = true
      const res = await WebsiteRepository.themes({ page: this.page, perpage: this.perpage, filter: this.filter });
     
      this.themes = res.themes
      this.page = res.page.current
      this.records = res.page.records
      this.perpage = res.page.perpage
      this.totalPages = res.page.totalPages
      this.loading = false
    },

 
 
    
    async createWebsite(router) {
      const cartStore = useCartStore()
        this.loading = true
        const itemWeb = 
          {
              "itemType": "product",
              "type": "product",
              "product_id": 2094,
              "domain": this.themeSelected.type == 'subdomain' ? this.domain + '.cloudwp.vn' : this.domain,
              "cycle": "a",
              "custom": {
                1543: this.themeSelected.id
              }
          }
        
          cartStore.addToCart(itemWeb)

        if(this.themeSelected.type == 'register'){
            const itemDomain = {
                "itemType": "domain",
                "type": "domain",
                "name": this.domain,
                "domain": this.domain,
                "action": "register",
                "years": 1,
                
            }
            cartStore.addToCart(itemDomain)
        }

        router.push({ name: 'DomainConfig' })

        this.loading = false

    }
  },
 
  persist: {
    paths: ['themeSelected', 'domain', 'cartItems']
  }
})  
 