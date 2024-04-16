import { get, post } from "@/core/apiClient"
const CartRepository = {
  getQuote: async (items) => {

     // Loại bỏ thuộc tính domainOptions từ mỗi mục trong mảng items
     const modifiedItems = items.map(item => ({
      product_id: item.product_id,
      domain: item.domain,
      cycle: item.cycle,
      custom: item.custom,
      addon: item.addon,
      addon_cycles: item.addon_cycles,
      subproducts: item.subproducts,
      subproducts_cycles: item.subproducts_cycles
    }));


    const carts = await post(`/quote`, {'items': modifiedItems})
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