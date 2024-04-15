import { defineStore } from 'pinia' 

import UserRepository from '@/repositories/UserRepository'
import { formatError } from '@/utility/formatError'
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      loading: false,
      error: '',
      info: '',
      user: null
    }
  },
  actions: {
    async details () {
      this.loading = true
      const data = await UserRepository.details()
      if (data.error) {
        this.error = data.error
        this.loading = false
        return
      }
      if(data.company){
        data.client.type = 'org'
      } else {
        data.client.type = 'ind'
      }

      this.user = data.client
      this.loading = false;
      return data;
    },
    async updateUser (data) {
      this.loading = true
      const res = await UserRepository.updateUser(data)
      if (res.error) {
     
        this.error = formatError(res.error)
        this.loading = false
        return
      }
      // this.user = res
      this.error = ''
      this.info = res.info
      this.loading = false
    }
  },
  persist: {
    paths: ['user']
  }
})