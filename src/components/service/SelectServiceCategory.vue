<template> 

  <RadioGroup v-model="internalValue">

      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4">
        <RadioGroupOption as="template" v-for="category in categories" :key="category.id" :value="category.id" v-slot="{ checked, active }"> 
          <div :class="[checked ? 'border-transparent bg-green-50' : 'border-gray-300  bg-white', active ? 'ring-2 ring-green-500' : '', 'relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none']">
            <span class="flex flex-1">
              <span class="flex flex-col">
                <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ category.name }}</RadioGroupLabel>
                <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500"  v-html="category.description" />
              </span>
            </span>
            <CheckCircleIcon v-if="checked" class="h-7 w-7 text-green-500 absolute right-1 top-1" aria-hidden="true" />
            <span :class="[active ? 'border' : 'border-2', checked ? 'border-green-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
          </div>
        </RadioGroupOption>
      </div>
    </RadioGroup>
 


  
</template>
<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'

import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
categories: Array,
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




// Xác định hàm chọn phần tử đầu tiên nếu modelValue không khớp với bất kỳ item nào trong categories
const selectFirstItemIfNotMatched = () => {
  const matchedItem = props.categories.find(category => category.id === internalValue.value)
  if (!matchedItem) {
    if (props.categories.length > 0) {
      internalValue.value = props.categories[0].id
    }
  }
}

// Theo dõi sự thay đổi trong internalValue và update modelValue
watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

// Theo dõi sự thay đổi trong modelValue và update internalValue
watch(() => props.modelValue, (newValue) => {
  if (newValue !== internalValue.value) {
    internalValue.value = newValue
    selectFirstItemIfNotMatched() // Kiểm tra và chọn phần tử đầu tiên nếu cần
  }
}, { deep: true })

onMounted(() => {
  selectFirstItemIfNotMatched()
})  

watchEffect(() => {
  selectFirstItemIfNotMatched()
})
// Khi component được tạo, kiểm tra và chọn phần tử đầu tiên nếu cần
selectFirstItemIfNotMatched()
</script>