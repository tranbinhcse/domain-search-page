import { useAuthStore } from "@/stores/auth/authStore"
import { storeToRefs } from "pinia"
import axios from "axios"

export const useAuthMiddleware = (router) => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)
  router.beforeEach((to, from) => {
    if (to.meta.requireAuth && !user.value) {
      return { name: 'login' }
    }
  })

  axios.interceptors.response.use(
    response => response,
    async error => {
      if (error.response.status == 401){
        authStore.user = null
        router.replace({name: 'login'})
      }
    }
  );
}