import { get, post } from "@/core/apiClient"

const WebsiteRepository = {
  themes: async () => {
    const res = await get(`/tinosite/themes`)
    return res.themes
  },

  

}

export default WebsiteRepository