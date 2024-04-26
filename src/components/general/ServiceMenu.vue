<template>
  <div>
    <Menu as="div" class="relative inline-block">
      <MenuButton>
        <Button class="flex items-center gap-x-1.5 text-sm border-2 rounded-md p-2 align-middle">
          <span class="inline-block w-4">
            <PlusIcon class="text-white" />
          </span>
          <span>Đặt dịch vụ</span>
        </Button>
      </MenuButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute w-[800px] right-0 mt-1 origin-top-right px-1 py-1 border border-gray-50 rounded-md bg-white shadow-lg focus:outline-none grid grid-cols-4"
        >
          <RouterLink
            :to="{ name: 'serviceOrder', params: { serviceCategoryId: 'cloud-hosting' } }"
            class="px-3 py-2 text-sm text-left hover:bg-gray-50"
          >
            <MenuItem>
              <span>Cloud Hosting</span>
            </MenuItem>
          </RouterLink>

          <RouterLink
            :to="{ name: 'serviceOrder', params: { serviceCategoryId: 'cloud-servers' } }"
            class="px-3 py-2 text-sm text-left hover:bg-gray-50"
          >
            <MenuItem>
              <span>Cloud Server</span>
            </MenuItem>
          </RouterLink>

          <RouterLink
            :to="{ name: 'account' }"
            class="px-3 py-2 text-sm text-left hover:bg-gray-50"
          >
            <MenuItem>
              <span>Test</span>
            </MenuItem>
          </RouterLink>

          <RouterLink
            :to="{ name: 'account' }"
            class="px-3 py-2 text-sm text-left hover:bg-gray-50"
          >
            <MenuItem>
              <span>Test</span>
            </MenuItem>
          </RouterLink>

          <RouterLink
            :to="{ name: 'account' }"
            class="px-3 py-2 text-sm text-left hover:bg-gray-50"
          >
            <MenuItem>
              <span>Test</span>
            </MenuItem>
          </RouterLink>

          <RouterLink
            :to="{ name: 'account' }"
            class="px-3 py-2 text-sm text-left hover:bg-gray-50"
          >
            <MenuItem>
              <span>Test</span>
            </MenuItem>
          </RouterLink>

          <RouterLink
            :to="{ name: 'account' }"
            class="px-3 py-2 text-sm text-left hover:bg-gray-50"
          >
            <MenuItem>
              <span>Test</span>
            </MenuItem>
          </RouterLink>

          <RouterLink
            :to="{ name: 'account' }"
            class="px-3 py-2 text-sm text-left hover:bg-gray-50"
          >
            <MenuItem>
              <span>Test</span>
            </MenuItem>
          </RouterLink>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
<script setup>
import Button from '../base/Button.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
</script>
