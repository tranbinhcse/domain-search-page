import { get, post } from '@/core/apiClient'

const WebsiteRepository = {
  themes: async (options) => {
    const res = await get(`/tinosite/themes`, options)
    return res
  },
  users: async (id) => {
    const res = await get(`/tinosite/${id}/users`)
    return res.list
  },

  wp_plugins: async (id) => {
    const res = await get(`/tinosite/${id}/plugins`)
    return res.list
  },

  wp_themes: async (id) => {
    const res = await get(`/tinosite/${id}/themes`)
    return res.list
  },

  getUrlLogin: async (id, options) => {
    const res = await post(`/tinosite/${id}/autologin`, options)
    return res.login_url
  }
}

export default WebsiteRepository
