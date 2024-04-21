<template>
  <div class="max-w-7xl mx-auto mb-[150px] px-5">
    <div class="mb-5 py-5">
      <Heading text="Chọn dịch vụ" class="text-primary uppercase text-3xl font-bold pb-2 mb-2" />
      <SelectServiceCategory v-model="category" :categories="SERVICES[route.params.slug]" />
    </div>
    <SkeletonServiceOrder v-if="loadingProducts" />
    <SkeletonServiceOrder v-if="loadingProducts" />
    <div class="mb-5 py-5" v-if="products.length">
      <Heading
        text="Chọn gói dịch vụ"
        class="text-primary uppercase text-3xl font-bold pb-2 mb-2"
      />
      <ProductSelect v-model="selectedProduct" :products="products" />
    </div>
    <div v-if="!product" class="pb-[400px]"></div>
    <SkeletonServiceOrder v-if="loadingProduct" class="pb-[400px]" />
    <div ref="productCycle"></div>
    <div v-if="product">
      <div class="mb-5 py-5">
        <a-spin :loading="loadingProductConfig" class="w-full">
          <Heading
            text="Chu kỳ thanh toán"
            class="text-primary uppercase text-3xl font-bold pb-2 mb-2"
          />
          <PeriodSelect :periods="cycles.items" v-model="selectedCycle" />
        </a-spin>
      </div>
      <div ref="productOption"></div>
      <Box v-if="product.domainOptions && product.domainOptions.register == '1' | product.domainOptions.hostname == '1'">
        <div v-if="product.domainOptions && product.domainOptions.register == '1'">
          <Heading
            text="Cấu hình tên miền"
            class="text-primary uppercase text-3xl font-bold pb-2 mb-2"
          />
          <DomainOptions
            v-model="domainSelected"
            :options="product.domainOptions"
            v-if="!product.domain"
          />
          <div v-else class="bg-white flex p-4 rounded mb-5 justify-between">
            <div>
              <p class="font-bold text-md">Tên miền đã chọn: {{ domainSelected.domain }}</p>
            </div>
            <a-button class="" @click="removeDomainSelected(domainSelected)">Đổi domain</a-button>
          </div>
        </div>

        <div
          v-if="
            product.domainOptions &&
            product.domainOptions.register == '0' &&
            product.domainOptions.hostname
          "
        >
          <Heading text="Hostname" class="text-primary uppercase text-3xl font-bold pb-2 mb-2" />
          <div class="mb-5 p-5 bg-white rounded">
            <a-input v-model="product.domain" placeholder="Vui lòng nhập vào hostname" />
          </div>
        </div>
      </Box>

      <Box v-if="product.formFields.length > 0" :loading="loadingProductConfig">
        <Heading
          text="Cấu hình sản phẩm"
          class="text-primary uppercase text-3xl font-bold pb-2 mb-2"
        />

        <div
          v-for="(
            { id, firstItemId, type, title, items, config: { minvalue, maxvalue, step } }, 
          ) in product.formFields"
          :key="id"
        >
          <p class="font-bold mt-5">{{ title }}</p>

          <div v-if="type == 'radio'">
            <a-radio-group
              v-model="product.custom[id]"
              size="mini"
              class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4"
            >
              <template v-for="item in items" :key="item.id">
                <a-radio :value="item.id" class="w-full p-0 m-0">
                  <template #radio="{ checked }">
                    <a-space
                      class="custom-radio-card w-full"
                      :class="{ 'custom-radio-card-checked ': checked }"
                    >
                      <div>
                        <div className="custom-radio-card-title">
                          {{ item.title }}
                        </div>
                        <div class="text-gray-700">{{ $currency(item.price) }}</div>
                      </div>
                      <div className="custom-radio-card-mask">
                        <div className="custom-radio-card-mask-dot" />
                      </div>
                    </a-space>
                  </template>
                </a-radio>
              </template>
            </a-radio-group>
          </div>

          <div v-if="type == 'checkbox'">
            <div
              class="relative flex items-start py-1"
              v-for="item in items"
              :key="item.id"
              :value="item.id"
            >
              <div class="flex h-6 items-center">
                <a-input
                  :checked="item.selected"
                  :id="item.id"
                  aria-describedby="comments-description"
                  :name="item.id"
                  value="1"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div class="ml-3 text-sm leading-6">
                <label :for="item.id" class="font-medium text-gray-900 cursor-pointer">
                  <p>{{ item.title }}</p>
                  <p :id="item.id" class="text-gray-500" v-if="item.price > 0">{{ item.price }}đ</p>
                </label>
              </div>
            </div>
          </div>

          <div
            v-if="
              type == 'input' || type == 'sliderinput' || type == 'slidersequenced' || type == 'qty'
            "
          >
            <a-input
              v-for="item in items"
              :key="item.id"
              :value="item.id"
              type="text"
              aria-describedby="email-description"
            />
          </div>

          <Slider
            v-if="type == 'slider'"
            v-model.number="product.custom[id][firstItemId]"
            :min="minvalue"
            :max="maxvalue"
            :step="step"
          />

          <!-- <a-slider v-if="type == 'slider'" show-tooltip show-input show-ticks v-model.number="product.custom[id][firstItemId]"  :min="minvalue" :max="maxvalue" :step="step" /> -->

          <a-select
            v-if="type == 'select' || type == 'servergroupselector' || type == 'sshkeyselect'"
            :style="{ width: '320px' }"
            v-model="product.custom[id]"
            placeholder="Please select ..."
            allow-clear
            allow-search
          >
            <a-option
              v-for="item in items"
              :key="item.id"
              :value="item.id"
              >{{ item.title }}
              -
              {{ $currency(item.price) }}</a-option
            >
          </a-select>
        </div>
      </Box>

      <Box v-if="!summary?.discount">
        <a-input
          :style="{ width: '320px' }"
          v-model="promocode"
          allow-clear=""
          placeholder="Nhập mã giảm giá"
        ></a-input>
        <a-button type="outline" @click="applyCoupon">{{ $t('Apply') }}</a-button>
        <a-alert class="mt-4" v-if="errorCoupon">{{ errorCoupon }}</a-alert>
      </Box>
    </div>
  </div>
  <div class="bottom-0 left-0 right-0 fixed md:pl-[250px]">
    <Box :loading="loading" v-if="product" class="drop-shadow-2xl mb-0 bg-white">
      <div class="flex justify-between max-w-7xl mx-auto">
        <div class="pr-10">
          <p>Tổng thanh toán:</p>
          <p>
            <span class="font-bold text-2xl text-primary">{{
              $currency(summary?.total)
            }}</span
            ><span></span>
          </p>
        </div>
        <div class="flex-1" v-if="summary?.discount">
          <p>Giảm giá:</p>
          <p>
            <span class="font-bold text-2xl text-primary">{{
              $currency(summary?.discount)
            }}</span
            ><span></span>
            <a-button size="mini" type="text" @click="product.promocode = ''">Xoá</a-button>
          </p>
        </div>

        <div class="left-auto">
          <Button
            @click="handleAddCart"
            btnClass="bg-primary px-10 py-3 text-white rounded"
            icon="heroicons-outline:banknotes"
            text="Thanh toán ngay"
          />
        </div>
      </div>
    </Box>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch, computed } from 'vue'
import { Message } from '@arco-design/web-vue'
import { SERVICES } from '@/config'
import SelectServiceCategory from '@/components/service/SelectServiceCategory.vue'
import ProductSelect from '@/components/service/ProductSelect.vue'
import PeriodSelect from '@/components/service/PeriodSelect.vue'
import DomainOptions from '@/components/service/DomainOptions.vue'
import Slider from '@/components/base/Slider.vue'

import SkeletonServiceOrder from '@/components/skeleton/SkeletonServiceOrder.vue'

import Box from '@/components/base/Box.vue'
import Button from '@/components/base/Button.vue'
import Heading from '@/components/base/Heading.vue'
import { useServiceOrderStore } from '@/stores/service/serviceOrderStore'
 

const serviceOrderStore = useServiceOrderStore()
const { getProducts, order, removeDomainSelected,   getProductConfiguration } =
  serviceOrderStore
const {
  error,
  loading,
  category,
  products,
  selectedProduct,
  cycle,
  product,
  summary,
  domainSelected,
  quote,
  errorCoupon,
  loadingProduct,
  loadingProductConfig,
  loadingProducts
} = storeToRefs(serviceOrderStore)

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  getProducts()
})

const promocode = ref()
const applyCoupon = () => {
  product.value.promocode = promocode.value
}

const cycles = computed(() => {
  return product.value.productFields.find((field) => field.id === 'cycle')
})

const selectedCycle = computed({
  get: () => {
    const selectedItem = cycles.value.items.find((item) => item.selected)
    return selectedItem ? selectedItem.value : null
  },
  set: (newValue) => {
    const cycleField = product.value.productFields.find((field) => field.id === 'cycle')
    if (cycleField) {
      cycleField.value = newValue
      product.value.cycle = newValue
    }
    cycle.value = newValue
    getProductConfiguration()
    scrollTosearchOption()
  }
})
const handleAddCart = () => {
  if (
    !product.value.domain &&
    product.value.domainOptions &&
    product.value.domainOptions.register == '1'
  ) {
    Message.success('Vui lòng nhập tên miền')
    error.value = { domain: 'Vui lòng nhập tên miền' }
  } else {
    order(router)
  }
}
watch(domainSelected, (newDomainSelected) => {
  product.value.domain = newDomainSelected.domain
})
watch(selectedProduct, () => {
  scrollTosearchCycle()
})
const productCycle = ref()
const productOption = ref()
const scrollTosearchCycle = () => {
  if (productCycle.value) {
    const topPosition = productCycle.value.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({ top: topPosition, behavior: 'smooth' })
  }
}
const scrollTosearchOption = () => {
  if (productOption.value) {
    const topPosition = productOption.value.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({ top: topPosition, behavior: 'smooth' })
  }
}
</script>
