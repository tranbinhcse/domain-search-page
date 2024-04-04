<template>
  <!-- <div class="grid md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
    <div v-for="product in products" :key="product.id"
      class="border p-6 rounded-md cursor-pointer border-dashed border-gray-300"
      :class="modelValue == product ? 'bg-green-200 border-green-500': ''"
      @click="$emit('update:modelValue', product.id)"
    >
      <h3 class="text-sm font-bold mb-3" :class="modelValue == product.id ? 'text-green-500' : 'text-black'">{{ product.name }}</h3>
      <div class="text-sm text-gray" v-html="product.description"></div>
    </div>
  </div> -->


  <RadioGroup v-model="internalValue">

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4">
        <RadioGroupOption as="template" v-for="product in products" :key="product.id" :value="product.id" v-slot="{ checked, active }"> 
          <div :class="[checked ? 'border-transparent bg-green-50' : 'border-gray-300 bg-white', active ? 'ring-2 ring-green-500' : '', 'relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none']">
            <span class="flex flex-1">
              <span class="flex flex-col w-full ">
                <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ product.name }}</RadioGroupLabel>
                <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500"  v-html="product.description" />
                <div class="text-center">
                  <button class="px-5 p-2 rounded mt-4" :class="checked ? 'bg-green-500 text-white' : 'bg-green-100 text-green-500 border border-green-500'">
                  <span class="flex items-center justify-center"  v-if="checked">
                    <CheckIcon class="w-5 h-5 mr-2" />Đã chọn
                  </span>
                  <span class="flex items-center justify-center" v-else>
                    <CheckIcon class="w-5 h-5 mr-2" /> Đăng ký
                  </span>
                </button>
                </div>
              </span>
            </span>
            <!-- <CheckCircleIcon v-if="checked" class="h-7 w-7 text-green-500 absolute right-1 top-1" aria-hidden="true" /> -->
            <span :class="[active ? 'border' : 'border-2', checked ? 'border-green-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
 


  
</template>
<script setup>
import { ref, watch } from 'vue'

import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon, TrashIcon, CheckIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
products: Array,
modelValue: Object
})

const emit = defineEmits(['update:modelValue'])


const internalValue = ref(props.modelValue)
  watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    internalValue.value = newValue
  }
}, { deep: true })

</script>