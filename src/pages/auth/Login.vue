<template>
  <main class="bg-white dark:bg-slate-900">
    <div class="relative flex">
      <!-- Content -->
      <div class="w-full md:w-1/2">
        <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
          <div class="flex-1">
            <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <!-- Logo -->
              <img class="max-w-full max-h-10" src="@/assets/logo.png" alt="Application 29" />
            </div>
          </div>       
          
          <FormLogin />
          
        </div>
      </div>
      
      <!-- Image -->
      <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
        <img class="object-cover object-center w-full h-full" src="@/assets/images/auth-image.jpg" width="760" height="1024" alt="Authentication" />
        <img class="absolute top-1/4 left-0 -translate-x-1/2 ml-8 hidden lg:block" src="@/assets/images/auth-decoration.png" width="218" height="224" alt="Authentication decoration" />
      </div>

    </div>

  </main>
</template>
<script setup>
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/authStore'
import Input from '@/components/base/Input.vue'
import Alert from '@/components/base/Alert.vue'
import Row from '@/components/base/Row.vue'
import Button from '@/components/base/Button.vue'
import Heading from '@/components/base/Heading.vue'
import FormLogin from '@/pages/auth/FormLogin.vue'
const authStore = useAuthStore()
const router = useRouter()
const { login } = authStore
const { error, user, loading } = storeToRefs(authStore)

const credential = reactive({
  username: 'binh@tino.org',
  password: 'Tino@123'
})

if (user.value) {
  router.replace({ name: 'home' })
}

watch(() => authStore.user, () => {
  router.replace({ name: 'home' })
})

</script>