import { defineStore } from 'pinia'
import { reactive, ref, watch, onMounted } from 'vue'
// import CartRepository from '@/repositories/CartRepository'
import WebsiteRepository from '@/repositories/WebsiteRepository'
// import { useCartStore } from "@/stores/cartStore";


export const useWebsiteDetailStore = defineStore('websiteDetailStore', {

    
  state: () => {
    return {
      loading: false,
      loadingPlugin: false,
      loadingTheme: false,
      loadingUser: false,
      loadingLogin: false,
      error: false,
      users: [],
      plugins: [],
      themes: [],
    }
  },
  actions: {
    
    

    async getWPPlugins(id){
        this.loadingPlugin = true
        this.plugins = await WebsiteRepository.wp_plugins(id);
        this.loadingPlugin = false
    },

    async getWPThemes(id){
        this.loadingTheme = true
        this.themes = await WebsiteRepository.wp_themes(id);
        this.loadingTheme = false
    },

    async getUsers(id){
        this.loadingUser = true
        this.users = await WebsiteRepository.users(id);
        this.loadingUser = false
    },

    async getUrlLogin(id, options){
        this.loadingLogin = true
        const url = await WebsiteRepository.getUrlLogin(id, options);
        this.loadingLogin = false
        return url;
    }
 
     
  },
//   persist: {
//     paths: ['users']
//   }
})  