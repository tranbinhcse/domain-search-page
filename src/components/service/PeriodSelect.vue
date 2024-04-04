<template>
  <div class="">
 
          <RadioGroup v-model="internalValue"> 

            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-4">
              <RadioGroupOption as="template" v-for="cycle in periods" :key="cycle.value" :value="cycle.value" v-slot="{ checked, active }">
               
                <div :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-green-500' : '', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                  <span class="flex flex-1">
                    <span class="flex flex-col w-full">
                      <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ cycle.title }}</RadioGroupLabel>
                      <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">{{ cycle.formatted }}</RadioGroupDescription>
                      <RadioGroupDescription as="span" class="mt-4 ">
                        <div class="flex justify-between">
                          <div class="text-2xl font-medium text-gray-900">{{ cycle.price }}đ</div>
                          <div class="text-red-500 bg-red-200 px-2 rounded text-sm py-1">Save 88%</div>
                        </div>
                      </RadioGroupDescription>
                    </span>
                  </span>
                  <CheckCircleIcon v-if="checked" class="h-7 w-7 text-green-500 absolute right-1 top-1" aria-hidden="true" />
                  <span :class="[active ? 'border' : 'border-2', checked ? 'border-green-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
        </div>
</template>
<script setup>
import { ref, watch } from 'vue'

import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
periods: Array,
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