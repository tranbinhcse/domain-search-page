import { useAuthStore } from '@/stores/auth/authStore'
import { storeToRefs } from 'pinia'
import axios from 'axios'

export const useAuthMiddleware = (router) => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  router.beforeEach((to) => {
    if (to.meta.requireAuth && !user.value) {
      return { name: 'login' }
    }
  })

  axios.interceptors.response.use(
    async (response) => {
      const responseData = response.data

      if (Array.isArray(responseData.error) && responseData.error.includes('invalid_token')) {
        authStore.user = null
        authStore.token = null
        authStore.verify = null
        authStore.refresh = null
        authStore.isLogin = false
      }

      if (Array.isArray(responseData.error) && responseData.error.includes('token_expired')) {
        authStore.user = null
        authStore.token = null
        authStore.verify = null
        authStore.refresh = null
        authStore.isLogin = false
      }

      return response
    },
    async (error) => {
      if (error.response?.status == 401) {
        authStore.user = null
        authStore.token = null
        authStore.verify = null
        authStore.refresh = null
        authStore.isLogin = false
        return error.response
      }
    }
  )
}
