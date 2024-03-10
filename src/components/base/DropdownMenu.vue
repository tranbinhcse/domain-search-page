<template>
  <Menu as="div" class="relative inline-block">
    <div>
      <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm text-gray-900 shadow-sm hover:bg-gray-50">
        {{ menus[modelValue] }}
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-900" />
      </MenuButton>
    </div>

    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <MenuItems
        class="absolute right-0 mt-1 w-56 origin-top-right px-1 py-1 border border-gray-50 rounded-md bg-white shadow-lg focus:outline-none">
        <MenuItem v-for="(value, key) in menus" :key="key">
          <button @click="$emit('update:modelValue', key)" class="block w-full px-3 py-2 text-sm text-left hover:bg-gray-50">{{ value }}</button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
defineProps(['modelValue', 'menus'])
defineEmits(['update:modelValue'])
</script>