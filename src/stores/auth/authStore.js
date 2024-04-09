import { defineStore } from 'pinia'
import { post } from '@/core/apiClient'
import { formatError } from '@/utility/formatError'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      loading: false,
      error: false,
      user: null,
      token: null,
      refresh: null,
      currency: null,
      verify: null,
      isLogin: false
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
      if(data.client.company){
        data.client.type = 'org'
      } else {
        data.client.type = 'ind'
      }

      this.user = data.client 
      this.token = data.token 
      this.refresh = data.refresh 
      this.currency = data.currency 
      this.verify = data.verify 
      this.loading = false
      this.isLogin = true
    },
    async logout(){
      await post('logout')
      this.user = null
      this.isLogin = false
    },
    async checkemail(email){
      const check = await post('checkemail', {email})
      if (check.error){
       this.error = {'email': check.error} 
      } else {
        this.error.email = []
      }
     
    },
    async signup(data){
      this.loading = true
      data.gender = data.gender == 'Nữ' ? 'Famale' : 'Male'
      const res = await post('signup', data)
      if (res.error) {

        this.error = formatError(res.error)
        this.loading = false
        return
      }
      this.user = res.client
      this.token = res.token 
      this.refresh = res.refresh 
      this.currency = res.currency 
      this.verify = res.verify 
      this.isLogin = true
      return res;
    }
  },
  persist: {
    paths: ['user', 'token', 'refresh', 'currency', 'isLogin']
  }
})