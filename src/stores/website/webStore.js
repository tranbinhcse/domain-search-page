import { defineStore } from 'pinia'
import { reactive, ref, watch, onMounted } from 'vue'
import CartRepository from '@/repositories/CartRepository'
 

export const useWebStore = defineStore('webStore', {

    
  state: () => {
    return {
      loading: false,
      error: false,
      domain: '',
      themeSelected: {
        "type": "subdomain"
      },
    }
  },
  actions: {
    
    async logout(){
     
      this.user = null
      this.isLogin = false
    },
    
    async createWebsite(router) {
     
        this.loading = true

      if(this.themeSelected.subdomain){
          this.domain = this.themeSelected.subdomain + '.cloudwp.vn'
      }
      

      const items = [
        {
            "type": "product",
            "product_id": 4015,
            "domain": this.domain,
            "cycle": "a",
            "custom": {
                21975: this.themeSelected.id
            }
        }
      ]

      if(this.themeSelected.type == 'register'){
          const itemDomain = {
              "type": "domain",
              "name": this.domain,
              "action": "register",
              "years": 1,
              
          }
          items.push(itemDomain)
      }

      const ord = await CartRepository.order(items, "1", "1" )

      if(ord.invoice_id) {
        this.themeSelected = {}
        this.domain = ''
          if(ord.total == 0){
            router.push({ name: 'WebsiteDetails', params: { id: ord.items[0].id } })
          } else {
            router.push({ name: 'invoiceDetails', params: { id: ord.invoice_id } })
          }
          
      }

      this.loading = false

  }
  },
  persist: {
    paths: ['themeSelected', 'domain']
  }
})  