import { defineStore } from 'pinia'
import { reactive, ref, watch, onMounted } from 'vue'
import CartRepository from '@/repositories/CartRepository'
import WebsiteRepository from '@/repositories/WebsiteRepository'
import { useCartStore } from "@/stores/cartStore";


export const useWebStore = defineStore('webStore', {

    
  state: () => {
    return {
      loading: false,
      error: false,
      domain: '',
      themes: [],
      themeSelected: {
        "type": "subdomain"
      },
      cartItems: [],
    }
  },
  actions: {
    
    async logout(){
     
      this.user = null
      this.isLogin = false
    },

    async getThemes(){
      this.themes = await WebsiteRepository.themes();
    },

 
    
    async createWebsite(router) {
      const cartStore = useCartStore()
          this.loading = true
        if(this.themeSelected.type == 'subdomain'){
            this.domain = this.domain + '.cloudwp.vn'
        }
        

        const itemWeb = 
          {
              "itemType": "product",
              "type": "product",
              "product_id": 4015,
              "domain": this.domain,
              "cycle": "a",
              "custom": {
                  21975: this.themeSelected.id
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