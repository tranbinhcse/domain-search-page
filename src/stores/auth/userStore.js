import { defineStore } from 'pinia' 

import UserRepository from '@/repositories/UserRepository'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      loading: false,
      error: false,
      user: null
    }
  },
  actions: {
    async details () {
      this.loading = true
      const data = await UserRepository.details()
      if (data.error) {
        this.error = true
        this.loading = false
        return
      }
      this.user = data
      return data;
    }
  },
  persist: true
})