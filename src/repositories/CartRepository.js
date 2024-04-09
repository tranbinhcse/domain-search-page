import { get, post } from "@/core/apiClient"
const CartRepository = {
  getQuote: async (items) => {
    const carts = await post(`/quote`, {'items': items})
    return carts
  },

  order: async (items, pay_method, aff_id) => {
    const carts = await post(`/order`, {'items': items, 'pay_method': pay_method, 'aff_id': aff_id})
    return carts
  },
  getFreePromocode: async options => {
    const promo = await post(`/domain/vnnic/promocode`, options)
    return promo
  }

}

export default CartRepository