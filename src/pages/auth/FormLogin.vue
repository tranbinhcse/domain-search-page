<template>

    <div class="flex-1"></div>
<div class="max-w-sm mx-auto w-full px-4 py-8 bg-white dark:bg-slate-900">
            <h1 class="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Đăng nhập</h1>
            <!-- Form -->
            <a-alert v-if="error" type="error" v-for="e in error" :key="e">  {{ $t(e) }}</a-alert>
            <a-form ref="formRef" :model="credential" :rules="rules"  layout="vertical" class="mt-5" @submit="handleSubmit" :scrollToFirstError="true">
                <a-form-item field="username" label="Tài khoản" :validate-trigger="['change','input']"  >
                  <a-input v-model="credential.username" placeholder="Vui lòng nhập tài khoản..." />
                </a-form-item>
                <a-form-item field="password" label="Mật khẩu" :validate-trigger="['change','input']"  >
                  <a-input v-model="credential.password" placeholder="Vui lòng nhập mật khẩu..." />
                </a-form-item>
                <a-form-item class="flex justify-between">
                  <router-link class="text-sm underline hover:no-underline pr-5" to="/reset-password">Quên mật khẩu?</router-link>
                    <a-button class="flex-auto" type="primary" html-type="submit"  >Đăng ký</a-button>
                </a-form-item>
            </a-form>

     
     <!-- Footer -->
     <div class="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
              <div class="text-sm">
                Bạn chưa có tài khoản ?<router-link class="font-medium text-primary hover:text-red-600 dark:hover:text-red-400 pl-2" to="/signup"> Đăng ký</router-link>
              </div>
              <!-- Warning -->
               
            </div>
          </div>


          
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { reactive, watch, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth/authStore'
const authStore = useAuthStore()
const router = useRouter()
const { login } = authStore
const { error, user, loading, isLogin } = storeToRefs(authStore)

import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const formRef = ref(null) 
const credential = reactive({
  username: 'binh@tino.org',
  password: 'Tino@123'
})

 
      const rules = reactive({
          username: [
              { required:  true, message:'Vui lòng nhập email' },
              { type: 'email', message:'Vui lòng nhập đúng địa chỉ email' },
          ],
          password: [
              { required: true, message:'Vui lòng nhập mật khẩu' },
          ],
      })


      const handleSubmit = async({ values, errors }) => {
      
      if (errors){
        console.log(errors);
      } else {
        await login(credential)
       
        
      }
    
    };

if (user.value) {
  router.replace({ name: 'home' })
}

watch(() => authStore.user, () => {
  router.replace({ name: 'home' })
})


</script> 