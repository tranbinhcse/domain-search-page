import { API_ENDPOINT } from '@/config'
import { useAuthStore } from "@/stores/auth/authStore"
import { storeToRefs } from "pinia"
import axios from 'axios'
// axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.baseURL = "https://my.tino.org/api";

const getRequestHeaders = () => {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  if ( ! user.value ){
    return {}
  }

  return {
    'Authorization': `Bearer ${user.value.token}`
  }
}

export const send = async (url, method = 'GET', data, params = {}) => {
  const headers = getRequestHeaders()
  const response = await axios({ url, method, params, headers, data })
  return response.data
}

export const get = async (url, params = {}) => {
  const data = await send(url, 'GET', null, params)
  return data
}

export const post = async (url, data = {}) => {
  return await send(url, 'POST', data)
}
