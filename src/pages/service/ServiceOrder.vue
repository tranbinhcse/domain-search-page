<template>
  <div>
    <Box>
      <Heading text="Chọn dịch vụ" />
      <SelectServiceCategory
        v-model="category"
        :categories="SERVICES[route.params.serviceCategoryId]"
      />
    </Box>
    <Box v-if="products.length">
      <Heading text="Chọn gói dịch vụ" />
      <ProductSelect v-model="selectedProduct" :products="products" />
    </Box>
    <Box v-if="product">
      <Heading text="Dịch vụ bổ sung" />

      <div>
        <div
          v-for="(
            { id, firstItemId, type, title, items, config: { minvalue, maxvalue, step } }, index
          ) in product.formFields"
          :key="id"
        >
          <span>{{ title }}</span>
          <select v-if="type == 'radio'" v-model="product.custom[id]" class="border">
            <option v-for="item in items" :selected="index == 0" :key="item.id" :value="item.id">
              {{ item.title }} - {{ item.price }}đ
            </option>
          </select>
          <Slider
            v-if="type == 'slider'"
            v-model.number="product.custom[id][firstItemId]"
            :min="minvalue"
            :max="maxvalue"
            :step="step"
          />
        </div>
      </div>
      <div>
        <div v-for="{ id, title, config: [, { items }] } in product.addonFields" :key="id">
          <input type="checkbox" v-model="product.addon[id]" /> {{ title }}
          <select v-model="product.addon_cycles[id]" v-if="product.addon[id]" class="border">
            <option v-for="(item, index) in items" :key="index" :value="item.value">
              {{ item.title }} - {{ item.price }}đ
            </option>
          </select>
        </div>
      </div>
      <div>
        <div v-for="{id, title, config: [ , { items }]} in product.subProductFields" :key="id">
          <input type="checkbox" v-model="product.subproducts[id]" />
          {{ title }}
          <select
            v-model="product.subproducts_cycles[id]"
            v-if="product.subproducts[id]"
            class="border"
          >
            <option
              v-for="(item, index) in items"
              :key="index"
              :value="item.value"
            >
              {{ item.title }} - {{ item.price }}đ
            </option>
          </select>
        </div>
      </div>
      <div>
        <div v-for="{id, type, title, items} in product.productFields" :key="id">
          <h3>{{ title }}</h3>
          <input
            v-if="type == 'input'"
            v-model="product[id]"
            type="text"
            class="border"
            :placeholder="title"
          />
          <select v-if="type == 'select'" v-model="product[id]">
            <option v-for="item in items" :key="item.value" :value="item.value">
              {{ item.title }} - {{ item.price }}đ
            </option>
          </select>
        </div>
      </div>
    </Box>
    <Box v-if="selectedProduct && paymentMethods">
      <Heading text="Phương thức thanh toán" />
      <select v-model="paymentMethod" class="border">
        <option v-for="(method, id) in paymentMethods" :key="id" :value="id">{{ method }}</option>
      </select>
    </Box>
    <Box>
      <Button @click="order">Đăng ký</Button>
    </Box>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { SERVICES } from '@/config'
import SelectServiceCategory from '@/components/service/SelectServiceCategory.vue'
import ProductSelect from '@/components/service/ProductSelect.vue'
import PeriodSelect from '@/components/service/PeriodSelect.vue'
import Input from '@/components/base/Input.vue'
import Slider from '@/components/base/Slider.vue'

import Box from '@/components/base/Box.vue'
import Button from '@/components/base/Button.vue'
import Heading from '@/components/base/Heading.vue'
import { useServiceOrderStore } from '@/stores/service/serviceOrderStore'
const serviceOrderStore = useServiceOrderStore()
const { getProducts, order } = serviceOrderStore
const {
  loading,
  category,
  products,
  selectedProduct,
  product,
  paymentMethods,
  paymentMethod
} = storeToRefs(serviceOrderStore)

import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => getProducts())
</script>
