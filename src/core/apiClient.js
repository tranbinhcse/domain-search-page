import { useAuthStore } from '@/stores/auth/authStore'
import { storeToRefs } from 'pinia'
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

const getRequestHeaders = () => {
  const authStore = useAuthStore()
  const { token } = storeToRefs(authStore)

  if (!token.value) {
    return {}
  }

  return {
    Authorization: `Bearer ${token.value}`
  }
}

export const send = async (url, method = 'GET', data, params = {}) => {
  const headers = getRequestHeaders()
  // const response = await axios({ url, method, params, headers, data })

  // return response.data
  try {
    const response = await axios({
      url,
      method,
      params,
      headers,
      data,
      timeout: 30000 // 5 seconds timeout
    })
    return response?.data
  } catch (error) {
    // Handle timeout or other errors
    if (axios.isCancel(error)) {
      console.error('Request canceled:', error.message)
    } else {
      console.error('Request error:', error.message)
    }
    throw error // re-throw the error for the caller to handle
  }
}

export const get = async (url, params = {}) => {
  const data = await send(url, 'GET', null, params)
  return data
}

export const post = async (url, data = {}) => {
  return await send(url, 'POST', data)
}

export const put = async (url, data = {}) => {
  return await send(url, 'PUT', data)
}
