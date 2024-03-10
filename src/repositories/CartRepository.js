import { get, post } from "@/core/apiClient"
const CartRepository = {
  getQuote: async (items) => {
    const carts = await post(`/quote`, {'items': items})
    return carts
  }

}

export default CartRepository