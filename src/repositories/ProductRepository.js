import { get } from '@/core/apiClient'
const ProductRepository = {
  getProducts: async (categoryId) => {
    const { products } = await get(`/category/${categoryId}/product`)
    return products
  },
  getConfiguration: async (productId, options) => {
    let url = `/order/${productId}`

    if (options) {
      const queryParams = new URLSearchParams()
      Object.keys(options).forEach((key) => {
        queryParams.append(key, options[key])
      })
      url += `?${queryParams.toString()}`
    }

    const {
      summary,
      product: {
        config: {
          // addons: addonFields,
          forms: formFields,
          product: productFields,
        },
        domain_options: domainOptionsFields,
        recurring_price,
        setup,
        cycle,
        promocode,
        os_templates
      }
    } = await get(url)

    const product = {
      product_id: productId,
      // domain: '',
      domainOptionsFields,
      // addonFields,
      formFields,
      productFields,
      recurring_price,
      setup,
      cycle,
      promocode,
      os_templates
      // subProductFields
    }

    const custom = {}

    
    const os = {};

  formFields.forEach(field => {
      // Nếu đây là một mục liên quan đến hệ điều hành và có mô tả
      if (field.metadata && field.metadata.variable == 'os') {
          const { description, items } = field;
          const groupedItems = {};
console.log(description);
          // Duyệt qua các mục và nhóm chúng dựa trên mô tả
          items.forEach(item => {
              const { title, description } = item;
              if (description !== "") {
                  if (!groupedItems[description]) {
                      groupedItems[description] = [];
                  }
                  groupedItems[description].push(item);
              } else {
                  groupedItems[title] = [item];
              }
          });

          // Thêm các nhóm vào os
          Object.keys(groupedItems).forEach(description => {
              if (!os[description]) {
                os[description] = [];
              }
              os[description] = [...os[description], ...groupedItems[description]];
          });
      }
  });

  product.os_templates = os


    formFields.forEach(({ id, type, firstItemId, config: { initialval } }) => {
      switch (type) {
        case 'radio':
          custom[id] = firstItemId
          break
        case 'slider':
          custom[id] = {}
          custom[id][firstItemId] = initialval
          break
      }
    })

    product.cycle = 'a'
    product.custom = custom
  

    const addon = {}
    const addon_cycles = {}

    // addonFields.forEach(({ id, config: [checkbox, { items }] }) => {
    //   addon[id] = false;
    //   addon_cycles[id] = items.find(item => item.selected).value;
    // })

    product.addon = addon
    product.addon_cycles = addon_cycles

    const subproducts = {}
    const subproducts_cycles = {}

    // subProductFields.forEach(({ id, config: [checkbox, { items }] }) => {
    //   subproducts[id] = false;
    //   subproducts_cycles[id] = items.find(item => item.selected).value;
    // })

    product.subproducts = subproducts
    product.subproducts_cycles = subproducts_cycles

    productFields.forEach(({ id, value }) => {
      product[id] = value
      // if(id === 'cycle') product.cycle = value
    })
    product.domainOptions = domainOptionsFields
    product.promocode = promocode
    return {
      summary,
      product
    }
  }
}

export default ProductRepository
