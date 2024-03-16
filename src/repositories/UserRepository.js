import { get, post } from "@/core/apiClient"
const UserRepository = {
    details: async () => {
        const details = await get(`/details`)
        return details
    }, 
 

}

export default UserRepository