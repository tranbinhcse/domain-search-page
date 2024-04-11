<template>
    <div class="">
            <RadioGroup v-model="internalValue"> 
              <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-x-4">
                <RadioGroupOption as="template" v-for="(method, id) in methods" :key="id" :value="id" v-slot="{ checked, active }">
                  <div :class="[checked ? 'border-transparent ' : 'border-gray-300', active ? 'ring-2 ring-green-500' : '', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none pl-[20px]']">
                    <span class="flex flex-1">
                      <span class="flex flex-col w-full">
                        <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">{{ method }}</RadioGroupLabel>
                        <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">Miễn phí thanh toán, kích hoạt ngay</RadioGroupDescription>
                      </span>
                    </span>
                    <CheckCircleIcon v-if="checked" class="h-7 w-7 text-green-500 absolute right-4 top-[50%] transform -translate-y-1/2" aria-hidden="true" />
                    
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
import { CheckCircleIcon } from '@heroicons/vue/20/solid'
    // import { CheckCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    methods: Array,
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


  const getIconPath = (methodId) => {
  // Assuming you have icons named as 1.png, 2.png, etc., in your assets
    // return new URL('/assets/paymentmethod/'+methodId +'.png', import.meta.url).href;
  };

  </script>