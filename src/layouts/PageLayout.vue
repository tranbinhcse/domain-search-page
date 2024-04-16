<template>

 
  <template v-if="!isLogin && requiresAuth">
    <div class="min-h-[100dvh] h-full flex flex-col after:flex-1">
      <FormLogin />
    </div>
  </template>
  <template v-else>
    
    <router-view></router-view>
  </template>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import { storeToRefs } from 'pinia'

  import { useTabBarStore } from '@/stores';
  import { useAuthStore } from '@/stores';
  import FormLogin from '@/pages/auth/FormLogin.vue';

import { useRoute  } from 'vue-router';
const route = useRoute();

 const requiresAuth = computed(() => route.meta.requiresAuth || false)
  const tabBarStore = useTabBarStore();
  const authStore = useAuthStore();

  const { isLogin } = storeToRefs(authStore)

  const cacheList = computed(() => tabBarStore.getCacheList);
</script>

<style scoped lang="less"></style>
