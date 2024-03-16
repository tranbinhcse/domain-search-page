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
          <div class="max-w-sm mx-auto w-full px-4 py-8">
            <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back! ✨</h1>
            <!-- Form -->
            <form class="w-full max-w-sm" @submit.prevent="login(credential)">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1" for="username">Email</label>
                  <Input v-model="credential.username"  :class="['form-input w-full', errors?.username ? 'border-red-500' : '' ]" id="email "/>
                  <div v-if="errors?.username"  class="text-xs mt-1 text-rose-500">{{ errors.username[0] }}</div>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1" for="password">Password</label>
                  <Input id="password" :class="['form-input w-full', errors?.password ? 'border-red-500' : '' ]" type="password"  v-model="credential.password" />
                  <div v-if="errors?.password"  class="text-xs mt-1 text-rose-500">{{ errors.password[0] }}</div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-6">
                <div class="mr-1">
                  <router-link class="text-sm underline hover:no-underline" to="/reset-password">Forgot Password?</router-link>
                </div>
            

                <Button class="btn btn-primary w-full" :disabled="loading">
                      <div class="flex gap-2 items-center">
                          <div v-if="loading" class="w-30 h-30">
                              <Icon class="animate-spin" icon="mdi:loading"  width="20" />
                          </div>
                          <Icon icon="heroicons:arrow-right-end-on-rectangle" class="w-4 h-4 mr-2" v-else/>
                          Sign In
                      </div>
                  </Button>



              </div>
            </form>
            <!-- Footer -->
            <div class="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
              <div class="text-sm">
                Don't have an account ?<router-link class="font-medium text-primary hover:text-red-600 dark:hover:text-red-400 pl-2" to="/signup"> Sign in</router-link>
              </div>
              <!-- Warning -->
              <div class="mt-5">
                <div class="bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400 px-3 py-2 rounded">
                  <svg class="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
                    <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
                  </svg>
                  <span class="text-sm">
                    Tài khoản demo đã nhập sẵn.
                  </span>
                </div>
              </div>
            </div>
          </div>

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