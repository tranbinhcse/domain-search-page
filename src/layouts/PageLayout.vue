<template>



  <template v-if="isLogin">
    <router-view></router-view>
  </template>
  <template v-else>
    <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
      <FormLogin />
    </div>
    
  </template>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { storeToRefs } from 'pinia'

  import { useTabBarStore } from '@/stores';
  import { useAuthStore } from '@/stores';
  import FormLogin from '@/pages/auth/FormLogin.vue';

  const tabBarStore = useTabBarStore();
  const authStore = useAuthStore();

  const { isLogin } = storeToRefs(authStore)

  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less"></style>
