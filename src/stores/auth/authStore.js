import { defineStore } from 'pinia'
import { post } from '@/core/apiClient'


export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      loading: false,
      error: false,
      user: null
    }
  },
  actions: {
    async login (credential) {
      this.loading = true
      const data = await post('login', credential)
      if (data.error) {
        this.error = true
        this.loading = false
        return
      }
      this.user = {
        id: data.client.id,
        token: data.token,
        refresh: data.refresh,
        firstname: data.client.firstname,
        lastname: data.client.lastname,
        email: data.client.email,
      }
      this.loading = false
    },
    async logout(){
      await post('logout')
      this.user = null
    }
  },
  persist: true
})