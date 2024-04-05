<template>
  <div>
    <div class="max-w-7xl mx-auto">
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
        
        <div v-if="product.domainOptions">
          <Heading text="Domain Configuration" class="text-green-500 uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2" />
          <DomainOptions  :options="product.domainOptions" />
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
                        <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500" >{{ item.price }}đ</RadioGroupDescription>
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
 
            <a-select  v-if="type == 'select'" :style="{width:'320px'}" v-model="product.custom[id]" placeholder="Please select ..." allow-clear>
                <a-option  v-for="item in items" :key="item.id" :value="item.id" v-slot="{ checked, active }">{{item.title}} - {{$currency(item.price)}}</a-option>
             
              </a-select>

              
  


          </div>
        </Box>
        
        
        <div class="mb-5 py-5" v-if="product.addonFields.length > 0">
          <Heading text="Dịch vụ đi kèm"  class="text-green-500 uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2" />

          <div role="checkbox" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4" aria-checked="false">
          
              <label  v-for="{ id, title, description, config: [, { items }] } in product.addonFields" :key="id" :for="`addons-${id}`" class="col-span-1 flex  rounded-md cursor-pointer" > 
                <div class="relative w-full p-4 rounded-md shadow-sm flex flex-col justify-between bg-white" :class="[product.addon[id] ? 'border-2 border-green-500' : 'border']">
                  
                    <CheckCircleIcon v-if="product.addon[id]" class="h-7 w-7 text-green-500 absolute right-1 top-1" aria-hidden="true" />
                  <div>
                      <input type="checkbox" class="hidden" v-model="product.addon[id]" :id="`addons-${id}`" />
                      <p class="font-bold"> {{ title }}</p>
                      <p class="font-normal text-sm text-gray-500 pt-2">{{ description }}</p>
                  </div>
                    <Popover v-if="product.addon[id]" class="relative mt-4 "  v-slot="{ open }">
                    <div class="flex items-center divide-x  inline-flex rounded-md relative" :class="[product.addon[id] ? 'bg-green-500 text-white' : 'bg-green-100 text-green-500']">
                      <PopoverButton>
                        <button class="px-2 py-2 flex items-center">
                          <span class="pr-2">{{ product.addon_cycles[id] ?? 'chọn'  }}</span><Icon :class="{ 'rotate-180 transform': open }"  icon="heroicons-outline:chevron-down" />
                        </button>
                      </PopoverButton>
                      <button class="px-3" v-if="product.addon[id]" ><Icon icon="heroicons-outline:x-mark" /></button>
                    </div>
                      <PopoverPanel class="absolute z-10 w-auto bg-white p-2 shadow-md rounded" v-slot="{ close }">
                        <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 min-w-60" aria-labelledby="dropdownRadioHelperButton" >
                            <li  v-for="(item, index) in items" :key="index" >
                              <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600" >
                                <div class="flex items-center h-5">
                                    <input v-model="product.addon_cycles[id]"  :value="item.value"  :id="index" name="helper-radio" type="radio"  class="w-4 h-4">
                                </div>
                                <div class="ms-2 text-sm w-full cursor-pointer">
                                    <label :for="index" class="font-medium text-gray-900 dark:text-gray-300">
                                      <div>{{ item.title }}</div>
                                      <p id="helper-radio-text-4" class="text-xs font-normal text-gray-500 dark:text-gray-300">{{ item.price }}đ</p>
                                    </label>
                                </div>
                              </div>
                            </li>
                          </ul>
                      </PopoverPanel>
                    </Popover>

                  </div>
              </label>
          </div>
        </div>

        <div class="mb-5 py-5" v-if="product.subProductFields.length > 0">
        
          <div role="checkbox" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4" aria-checked="false">
          
          <label  v-for="{ id, title, description, config: [, { items }] } in product.subProductFields" :key="id" :for="`subproducts-${id}`" class="col-span-1 flex  rounded-md cursor-pointer" > 
            <div class="relative w-full p-4 rounded-md shadow-sm flex flex-col justify-between bg-white" :class="[product.subproducts[id] ? 'border-2 border-green-500' : 'border']">
                
                <CheckCircleIcon v-if="product.subproducts[id]" class="h-7 w-7 text-green-500 absolute right-1 top-1" aria-hidden="true" />
              <div>
                  <input type="checkbox" class="hidden" v-model="product.subproducts[id]" :id="`subproducts-${id}`" />
                  <p class="font-bold"> {{ title }}</p>
                  <p class="font-normal text-sm text-gray-500 pt-2" v-html="description" />
              </div>
                <Popover v-if="product.subproducts[id]" class="relative mt-4 "  v-slot="{ open }">
                <div class="flex items-center divide-x  inline-flex rounded-md relative" :class="[product.subproducts[id] ? 'bg-green-500 text-white' : 'bg-green-100 text-green-500']">
                  <PopoverButton>
                    <button class="px-2 py-2 flex items-center">
                      <span class="pr-2">{{ product.subproducts_cycles[id] ?? 'chọn'  }}</span><Icon :class="{ 'rotate-180 transform': open }"  icon="heroicons-outline:chevron-down" />
                    </button>
                  </PopoverButton>
                  <button class="px-3" v-if="product.subproducts[id]" ><Icon icon="heroicons-outline:x-mark" /></button>
                </div>
                  <PopoverPanel class="absolute z-10 w-auto bg-white p-2 shadow-md rounded" v-slot="{ close }">
                    <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 min-w-60" aria-labelledby="dropdownRadioHelperButton" >
                        <li  v-for="(item, index) in items" :key="index" >
                          <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600" >
                            <div class="flex items-center h-5">
                                <input v-model="product.subproducts_cycles[id]"  :value="item.value"  :id="index" name="helper-radio" type="radio"  class="w-4 h-4">
                            </div>
                            <div class="ms-2 text-sm w-full cursor-pointer">
                                <label :for="index" class="font-medium text-gray-900 dark:text-gray-300">
                                  <div>{{ item.title }}</div>
                                  <p id="helper-radio-text-4" class="text-xs font-normal text-gray-500 dark:text-gray-300">{{ item.price }}đ</p>
                                </label>
                            </div>
                          </div>
                        </li>
                      </ul>
                  </PopoverPanel>
                </Popover>

              </div>
          </label>
      </div>
      
      </div>
        <div v-if="selectedProduct && paymentMethods" class="mb-10">
          <Heading text="Phương thức thanh toán" class="text-green-500 uppercase text-3xl font-bold border-b-2 border-gray-50 pb-2 mb-2" />
          <PaymentMethod  v-model="paymentMethod" :methods="paymentMethods" />
           

        </div>
      </div>
      </div>
      <div class="sticky bottom-0 -mx-4 sm:-mx-6 lg:-mx-8">
        <Box v-if="product" class="drop-shadow-2xl mb-0">
          <div class="flex justify-between max-w-7xl mx-auto">
            <div>
              <p>Tổng thanh toán:</p>
              <p>
                <span  class="font-bold text-2xl text-green-500">100.000đ</span><span>/năm</span>
              </p>
            </div>
            
            <div class="left-auto">
              <Button @click="order" btnClass="bg-green-500 px-10 py-3 text-white rounded" icon="heroicons-outline:banknotes" text="Thanh toán ngay"   />
            </div>
          </div>
        </Box>
      </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch, computed } from 'vue'
import { SERVICES } from '@/config'
import SelectServiceCategory from '@/components/service/SelectServiceCategory.vue'
import ProductSelect from '@/components/service/ProductSelect.vue'
import PeriodSelect from '@/components/service/PeriodSelect.vue'
import DomainOptions from '@/components/service/DomainOptions.vue'
import PaymentMethod from '@/components/general/PaymentMethod.vue'
import Input from '@/components/base/Input.vue'
import Icon from '@/components/base/Icon.vue'
import Slider from '@/components/base/Slider.vue'

import Box from '@/components/base/Box.vue'
import Button from '@/components/base/Button.vue'
import Heading from '@/components/base/Heading.vue'
import { useServiceOrderStore } from '@/stores/service/serviceOrderStore'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'





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




const cycles = computed(() => {
  return product.value.productFields.find(field => field.id === 'cycle');
});


const selectedCycle = computed(() => {
  const selectedItem = cycles.value.items.find(item => item.selected);
  return selectedItem ? selectedItem.value : null;
});

</script>
