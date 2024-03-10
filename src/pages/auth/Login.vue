<template>
  <div class="flex min-h-screen">
    <div class="grow max-w-xl p-10 flex flex-col justify-center items-center">
      <form class="w-full max-w-sm" @submit.prevent="login(credential)">
        <Row>
          <Heading text="Đăng nhập" />
        </Row>
        <Row>
          <Input type="email" placeholder="email" v-model="credential.username" />
        </Row>
        <Row>
          <Input type="password" placeholder="password" v-model="credential.password" />
        </Row>
        <alert v-if="error" :variant="'warning'" title="Đăng nhập thất bại" content="Sai thông tin email hoặc mật khẩu" />
        <Row>
          <Button>
            <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6 animate-spin inline-block">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>

            Đăng nhập</Button>
        </Row>
      </form>
    </div>
    <div class="grow bg-green-500 flex flex-col justify-center items-center">
      <img src="@/assets/logo.png" />
    </div>
  </div>
</template>
<script setup>
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
  username: '',
  password: ''
})

if (user.value) {
  router.replace({ name: 'home' })
}

watch(() => authStore.user, () => {
  router.replace({ name: 'home' })
})

</script>