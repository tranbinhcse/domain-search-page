import { defineStore } from 'pinia'
import { reactive, ref, watch, onMounted } from 'vue'
// import CartRepository from '@/repositories/CartRepository'
import WebsiteRepository from '@/repositories/WebsiteRepository'
// import { useCartStore } from "@/stores/cartStore";


export const useWebsiteDetailStore = defineStore('websiteDetailStore', {

    
  state: () => {
    return {
      loading: false,
      error: false,
      users: [],
      plugins: [],
      themes: [],
    }
  },
  actions: {
    
    

    async getWPPlugins(id){
        this.loading = true
        this.plugins = await WebsiteRepository.wp_plugins(id);
        this.loading = false
    },

    async getWPThemes(id){
        this.loading = true
        this.themes = await WebsiteRepository.wp_themes(id);
        this.loading = false
    },

    async getUsers(id){
        this.loading = true
        this.users = await WebsiteRepository.users(id);
        this.loading = false
    },

    async getUrlLogin(id, options){
        this.loading = true
        const url = await WebsiteRepository.getUrlLogin(id, options);
        this.loading = false
        return url;
    }
 
     
  },
//   persist: {
//     paths: ['users']
//   }
})  