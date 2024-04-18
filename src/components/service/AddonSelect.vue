<template>
     <div>

        {{ addons }}
        <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <li  v-for="{ id, title, description, config: [, { items }] } in addons" :key="id" class="col-span-1 flex  rounded-md">
            <div class="relative w-full p-4 rounded-md shadow-sm flex flex-col justify-between bg-white" :class="[product.addon[id] ? 'border-2 border-primary' : 'border']">
            <div class="check-sign absolute right-0 top-0 overflow-hidden w-10 h-10" v-if="product.addon[id]">
                <p class="RadioCheck bg-primary absolute -top-2 -right-5 text-center w-[50px] h-[30px] text-center origin-center rotate-45" >
                <Icon icon="heroicons-outline:check" class="w-13 h-1 text-white flex origin-center -rotate-45" fontSize="25px" />
                </p>
            </div>
            <div>
                <input type="hidden" v-model="product.addon[id]" />
                <p class="font-bold"> {{ title }}</p>
                <p class="font-normal text-sm text-gray-500 pt-2">{{ description }}</p>
            </div>
            <Popover class="relative mt-4 "  v-slot="{ open }">
                <div class="flex items-center divide-x  inline-flex rounded-md relative" :class="[product.addon[id] ? 'bg-primary text-white' : 'bg-green-100 text-primary']">
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
                        <div class="ms-2 text-sm">
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
        </li>
    </ul>
     </div>
</template>

<script setup>
import { ref, watch } from 'vue'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { Icon } from '@iconify/vue';
const props = defineProps({
  addons: Array
})
</script>