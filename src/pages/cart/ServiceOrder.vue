<template>
 
  <a-spin class="w-full" :loading="loading">
    <div class="max-w-7xl mx-auto mb-[150px]">
      <div class="mb-5 py-5 ">
        <Heading text="Chọn dịch vụ" class="text-green-500 uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2" />
        <SelectServiceCategory
          v-model="category"
          :categories="SERVICES[route.params.slug]"
        />
      </div>
      <div class="mb-5  py-5" v-if="products.length">
        <Heading text="Chọn gói dịch vụ" class="text-green-500 uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2"/>
        <ProductSelect v-model="selectedProduct" :products="products" />
      </div>
      <div v-if="product">
       
        <div class="mb-5  py-5">
          <Heading text="Chu kỳ thanh toán" class="text-green-500 uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2" />
          <PeriodSelect :periods="cycles.items" v-model="selectedCycle" />
        </div>
       
        <div v-if="product.domainOptions && product.domainOptions.register == '1'">
          <Heading text="Domain Configuration" class="text-green-500 uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2" />
          <DomainOptions v-model="domainSelected" :options="product.domainOptions" v-if="!product.domain" />
          <div v-else class="bg-white flex p-4 rounded mb-5 justify-between">
            <div>
              <p class="font-bold text-md">Tên miền đã chọn: {{ domainSelected.domain }}</p>
            </div>
            <a-button class="" @click="removeDomainSelected(domainSelected)">Đổi domain</a-button>
          </div>
        </div>
        <div v-if="product.domainOptions && product.domainOptions.register == '0' && product.domainOptions.hostname">
          <Heading text="Hostname" class="text-green-500 uppercase text-3xl font-bold pb-2 mb-2" />
          <div class="mb-5  p-5 bg-white rounded">
            <a-input v-model="product.domain" placeholder="Vui lòng nhập vào hostname" />
          </div>
        </div>

        <Box v-if="product.formFields.length > 0">
          <Heading text="Cấu hình sản phẩm" class="text-green-500 uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2" />
          
          <div
            v-for="(
              { id, firstItemId, type, title, items, config: { minvalue, maxvalue, step } }, index
            ) in product.formFields"
            :key="id"
          >
            <p  class="font-bold mt-5">{{ title }}</p> 

          <div v-if="type == 'radio'" >
            <RadioGroup v-model="product.custom[id]">
              <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4">
                <RadioGroupOption as="template" v-for="item in items" :key="item.id" :value="item.id" v-slot="{ checked, active }"> 
                  <div :class="[checked ? 'border-transparent ' : 'border-gray-300 ', active ? 'ring-2 ring-green-500' : '', 'relative flex cursor-pointer bg-white rounded-lg border p-4 shadow-sm focus:outline-none']">
                    <span class="flex flex-1">
                      <span class="flex flex-col w-full ">
                        <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ item.title }}</RadioGroupLabel>
                        <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500" >{{ $currency(item.price) }}</RadioGroupDescription>
                      </span>
                    </span>
                    <CheckCircleIcon v-if="checked" class="h-7 w-7 text-green-500 absolute right-1 top-1" aria-hidden="true" />
                    <span :class="[active ? 'border' : 'border-2', checked ? 'border-green-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>

 

          <div v-if="type == 'checkbox'">
            <div class="relative flex items-start py-1"  v-for="item in items" :key="item.id" :value="item.id">
                <div class="flex h-6 items-center">
                  <input :checked="item.selected" :id="item.id" aria-describedby="comments-description" :name="item.id" value="1" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                </div>
                <div class="ml-3 text-sm leading-6 ">
                  <label :for="item.id" class="font-medium text-gray-900 cursor-pointer">
                    <p>{{ item.title }}</p>
                    <p :id="item.id" class="text-gray-500" v-if="item.price > 0">{{ item.price }}đ</p>

                  </label>
                </div>
              </div>
          </div>
         
          <div v-if="type == 'input' || type == 'sliderinput' || type == 'slidersequenced' || type == 'qty'"> 
            <Input  v-for="item in items" :key="item.id" :value="item.id" type="text" aria-describedby="email-description" />
          </div>
 

            <Slider
              v-if="type == 'slider'"
              v-model.number="product.custom[id][firstItemId]"
              :min="minvalue"
              :max="maxvalue"
              :step="step"
            /> 
           
            <!-- <a-slider v-if="type == 'slider'" show-tooltip show-input show-ticks v-model.number="product.custom[id][firstItemId]"  :min="minvalue" :max="maxvalue" :step="step" /> -->
            
            <a-select  v-if="type == 'select' || type == 'servergroupselector' || type == 'sshkeyselect'" :style="{width:'320px'}" v-model="product.custom[id]" placeholder="Please select ..." allow-clear allow-search>
                <a-option  v-for="item in items" :key="item.id" :value="item.id" v-slot="{ checked, active }">{{item.title}} - {{$currency(item.price)}}</a-option>
            </a-select>


          </div>
        </Box>
     
      </div>
      </div>
      <div class="bottom-0 left-0 right-0 fixed pl-[250px]">
        <div v-if="product" class="drop-shadow-2xl mb-0 bg-white p-5">
          <div class="flex justify-between max-w-7xl mx-auto">
            <div>
              <p>Tổng thanh toán:</p>
              <p>

           
            
                <span  class="font-bold text-2xl text-green-500">{{ $currency(quote?.summary?.total) }}</span><span></span>
              </p>
            </div>
            
            <div class="left-auto">
              <Button @click="handleAddCart" btnClass="bg-green-500 px-10 py-3 text-white rounded" icon="heroicons-outline:banknotes" text="Thanh toán ngay"   />
            </div>
          </div>
        </div>
      </div>
  </a-spin>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch, computed } from 'vue'
import { Message } from '@arco-design/web-vue';
import { SERVICES } from '@/config'
import SelectServiceCategory from '@/components/service/SelectServiceCategory.vue'
import ProductSelect from '@/components/service/ProductSelect.vue'
import PeriodSelect from '@/components/service/PeriodSelect.vue'
import DomainOptions from '@/components/service/DomainOptions.vue'
import Input from '@/components/base/Input.vue'
import Icon from '@/components/base/Icon.vue'
import Slider from '@/components/base/Slider.vue'

import Box from '@/components/base/Box.vue'
import Button from '@/components/base/Button.vue'
import Heading from '@/components/base/Heading.vue'
import { useServiceOrderStore } from '@/stores/service/serviceOrderStore'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'


const serviceOrderStore = useServiceOrderStore()
const { getProducts, order, removeDomainSelected, getQuoteProduct, getProductConfiguration } = serviceOrderStore
const {
  error,
  loading,
  category,
  products,
  selectedProduct,
  cycle,
  product, 
  domainSelected,
  quote
} = storeToRefs(serviceOrderStore)

import { useRoute, useRouter } from 'vue-router'


const route = useRoute() 
const router = useRouter() 

onMounted(() => {
  getProducts()
})

const cycles = computed(() => {
  return product.value.productFields.find(field => field.id === 'cycle');
});
 
const selectedCycle = computed({
  get: () => {
    const selectedItem = cycles.value.items.find(item => item.selected);
    return selectedItem ? selectedItem.value : null;
  },
  set: (newValue) => {
    // Update the value of 'cycle' field
    const cycleField = product.value.productFields.find(field => field.id === 'cycle');
    if (cycleField) {
      cycleField.value = newValue;
      product.value.cycle = newValue; 
      // Perform any other actions you need here
    }
    cycle.value=newValue
    getProductConfiguration()
  }
});

 

const handleAddCart = () => {
  if(!product.value.domain && product.value.domainOptions && product.value.domainOptions.register=='1'){
    Message.success('Vui lòng nhập tên miền')
    error.value = {'domain': 'Vui lòng nhập tên miền'} 
  } else {
    order(router);
  }
  
}
watch(domainSelected, (newDomainSelected) => {
  product.value.domain = newDomainSelected.domain
})

 
// watch(product, (newProduct) => {
//   console.log(newProduct);
//   // getQuoteProduct()
// })


</script>
