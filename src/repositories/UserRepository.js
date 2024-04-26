import { get, put } from '@/core/apiClient'
const UserRepository = {
  details: async () => {
    const details = await get(`/details`)
    return details
  },

  updateUser: async (data) => {
    const res = await put(`/details`, data)
    return res
  }
}

export default UserRepository
