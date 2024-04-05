import { get, post } from "@/core/apiClient"
const ProductRepository = {
  getProducts: async categoryId => {
    const { products } = await get(`/category/${categoryId}/product`)
    return products
  },
  getConfiguration: async productId => {
    const { product: { config: { addons: addonFields, forms: formFields, product: productFields, subproducts: subProductFields }, domain_options: domainOptionsFields } } = await get(`/order/${productId}`)

    const product = {
      product_id: productId,
      domain: '',
      domainOptionsFields,
      addonFields,
      formFields,
      productFields,
      subProductFields
    }

    const custom = {}

    formFields.forEach(({ id, type, firstItemId, config: { initialval } }) => {
      switch (type) {
        case 'radio':
          custom[id] = firstItemId
          break;
        case 'slider':
          custom[id] = {}
          custom[id][firstItemId] = initialval
          break;
      }
    })

    product.custom = custom

    const addon = {}
    const addon_cycles = {}

    addonFields.forEach(({ id, config: [checkbox, { items }] }) => {
      addon[id] = false;
      addon_cycles[id] = items.find(item => item.selected).value;
    })

    product.addon = addon
    product.addon_cycles = addon_cycles

    const subproducts = {}
    const subproducts_cycles = {}

    subProductFields.forEach(({ id, config: [checkbox, { items }] }) => {
      subproducts[id] = false;
      subproducts_cycles[id] = items.find(item => item.selected).value;
    })

    product.subproducts = subproducts
    product.subproducts_cycles = subproducts_cycles

    productFields.forEach(({ id, value}) => {
      product[id] = value
    })

    product.domainOptions = domainOptionsFields;



    return product
  }
}

export default ProductRepository