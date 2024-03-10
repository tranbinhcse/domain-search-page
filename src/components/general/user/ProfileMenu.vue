<template>
  <Menu as="div" class="relative inline-block" v-if="user">

    <MenuButton>
      <button class="flex items-center gap-x-1.5 border-gray-50 text-sm border-2 rounded-md p-2 align-middle">
        <span class="inline-block w-4">
          <UserIcon class="text-gray" />
        </span>
        <span>{{ user.lastname }} {{ user.firstname }}</span>
        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-900" />
      </button>
    </MenuButton>
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <MenuItems
        class="absolute right-0 mt-1 w-56 origin-top-right px-1 py-1 border border-gray-50 rounded-md bg-white shadow-lg focus:outline-none">
        <RouterLink :to="{ name: 'account' }" class="block w-full px-3 py-2 text-sm text-left hover:bg-gray-50">
          <MenuItem>
          <span>Trang tài khoản</span>
          </MenuItem>
        </RouterLink>
        <MenuItem>
        <button @click="doLogout" class="block w-full px-3 py-2 text-sm text-left hover:bg-gray-50">Thoát</button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

import { UserIcon } from '@heroicons/vue/24/outline'

import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/authStore';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore()
const { logout } = authStore
const { user } = storeToRefs(authStore)
const router = useRouter()

const doLogout = async () => {
  await logout()
  router.replace({ name: 'login' })
}

</script>